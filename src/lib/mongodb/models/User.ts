import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  locale?: string;
  lastLogin: Date;
  metadata?: {
    loginsCount: number;
    lastIp?: string;
    lastLogin?: Date;
  };
  customData?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    auth0Id: {
      type: String,
      required: [true, 'Auth0 ID is required'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Picture URL must be a valid URL',
      },
    },
    locale: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      loginsCount: {
        type: Number,
        default: 0,
      },
      lastIp: String,
      lastLogin: Date,
    },
    customData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        delete ret._id;
        ret.id = ret._id;
        return ret;
      },
    },
    collection: 'users',
  }
);

// Ensure indexes are created
userSchema.index({ auth0Id: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: 1 });

// Add instance methods
userSchema.methods.toPublicJSON = function() {
  const user = this.toJSON();
  delete user.metadata;
  delete user.customData;
  return user;
};

// Add static methods
userSchema.statics.findByAuth0Id = function(auth0Id: string) {
  return this.findOne({ auth0Id });
};

userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Middleware to clean data before saving
userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 