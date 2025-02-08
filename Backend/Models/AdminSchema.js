const AdminSchema = {
    _id: ObjectId,
    auth: {
      type: ObjectId,
      ref: 'Auth',
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['super_admin', 'regional_admin', 'local_admin'],
      required: true
    },
    permissions: [{
      resource: String,
      actions: [String]  // ['create', 'read', 'update', 'delete']
    }],
    region: {
      type: String,
      required: true
    },
    contact: {
      email: String,
      phone: String,
      required: true
    },
    lastLogin: Date,
    accountStatus: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  };