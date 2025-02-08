const AuthSchema = {
    _id: ObjectId,
    userId: {
      type: ObjectId,
      required: true,
      refPath: 'userType'  // Dynamic reference to Admin/Volunteer
    },
    userType: {
      type: String,
      required: true,
      enum: ['Admin', 'Volunteer']
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String
    },
    lastPasswordReset: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    twoFactorSecret: String,
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,
    status: {
      type: String,
      enum: ['active', 'suspended', 'locked'],
      default: 'active'
    },
    sessions: [{
      token: String,
      device: String,
      ip: String,
      lastActivity: Date,
      expiresAt: Date
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  };