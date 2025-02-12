import { User, IUser } from './models/User';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import connectToDatabase from './mongodb';

/**
 * Creates or updates a user in MongoDB based on their Auth0 profile
 * @param auth0User - The Auth0 user profile
 * @param metadata - Additional metadata about the user session
 * @returns Promise resolving to the created/updated MongoDB user document
 * @throws Error if the operation fails
 */
export async function createOrUpdateUser(
  auth0User: UserProfile,
  metadata?: { ip?: string }
): Promise<IUser> {
  try {
    await connectToDatabase();

    if (!auth0User.email) {
      throw new Error('Auth0 user email is required');
    }

    const now = new Date();
    const userData = {
      auth0Id: auth0User.sub,
      email: auth0User.email,
      emailVerified: auth0User.email_verified || false,
      name: auth0User.name || undefined,
      nickname: auth0User.nickname || undefined,
      picture: auth0User.picture || undefined,
      locale: auth0User.locale || undefined,
      lastLogin: now,
      $inc: { 'metadata.loginsCount': 1 },
      $set: {
        'metadata.lastLogin': now,
        'metadata.lastIp': metadata?.ip,
      },
    };

    const user = await User.findOneAndUpdate(
      { auth0Id: auth0User.sub },
      userData,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    if (!user) {
      throw new Error('Failed to create/update user');
    }

    return user;
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}

/**
 * Retrieves a user from MongoDB by their Auth0 ID
 * @param auth0Id - The Auth0 ID of the user
 * @returns Promise resolving to the user document or null if not found
 */
export async function getUserByAuth0Id(auth0Id: string): Promise<IUser | null> {
  try {
    await connectToDatabase();
    return User.findByAuth0Id(auth0Id);
  } catch (error) {
    console.error('Error in getUserByAuth0Id:', error);
    throw error;
  }
}

/**
 * Updates the custom data for a user
 * @param auth0Id - The Auth0 ID of the user
 * @param customData - The custom data to store
 * @returns Promise resolving to the updated user document or null if not found
 */
export async function updateUserCustomData(
  auth0Id: string,
  customData: Record<string, unknown>
): Promise<IUser | null> {
  try {
    await connectToDatabase();
    return User.findOneAndUpdate(
      { auth0Id },
      { $set: { customData } },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error('Error in updateUserCustomData:', error);
    throw error;
  }
}

/**
 * Deletes a user from MongoDB
 * @param auth0Id - The Auth0 ID of the user to delete
 * @returns Promise resolving to true if user was deleted, false otherwise
 */
export async function deleteUser(auth0Id: string): Promise<boolean> {
  try {
    await connectToDatabase();
    const result = await User.deleteOne({ auth0Id });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
}

/**
 * Retrieves a user from MongoDB by their email
 * @param email - The email of the user
 * @returns Promise resolving to the user document or null if not found
 */
export async function getUserByEmail(email: string): Promise<IUser | null> {
  try {
    await connectToDatabase();
    return User.findByEmail(email);
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error;
  }
} 