import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectToDatabase from '@/lib/mongodb/mongodb';
import { getUserByAuth0Id, updateUserCustomData } from '@/lib/mongodb/mongodbUtils';
import { z } from 'zod';

// Validation schema for custom data
const CustomDataSchema = z.record(z.unknown());

/**
 * GET /api/user
 * Retrieves the user data from MongoDB
 * Requires Auth0 session
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const user = await getUserByAuth0Id(session.user.sub);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return public user data
    return NextResponse.json(user.toPublicJSON());
  } catch (error) {
    console.error('Error in GET /api/user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user
 * Updates the user's custom data
 * Requires Auth0 session
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate custom data
    const validationResult = CustomDataSchema.safeParse(body.customData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid custom data format', details: validationResult.error },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const updatedUser = await updateUserCustomData(session.user.sub, validationResult.data);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser.toPublicJSON());
  } catch (error) {
    console.error('Error in PATCH /api/user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 