const VolunteerSchema = {
    _id: ObjectId,
    auth: {
      type: ObjectId,
      ref: 'Auth',
      required: true
    },
    personalInfo: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      age: Number,
      gender: String,
      bloodGroup: String,
      identificationNumber: {
        type: String,
        required: true
      }
    },
    contact: {
      phone: {
        type: String,
        required: true
      },
      email: String,
      address: String
    },
    skills: [{
      type: String,
      enum: ['medical', 'rescue', 'logistics', 'communication', 'cooking', 'driving']
    }],
    permissions: [{
      resource: String,
      actions: [String]  // ['read', 'update'] - more limited than admin
    }],
    availability: {
      status: {
        type: String,
        enum: ['available', 'engaged', 'unavailable'],
        default: 'available'
      },
      preferredTimings: [String]
    },
    priority: {
      type: Number,
      enum: [1, 2, 3],
      required: true
    },
    certification: [{
      name: String,
      issuedBy: String,
      validUntil: Date,
      verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
      }
    }],
    currentAssignment: {
      location: {
        type: ObjectId,
        ref: 'ShelterHome'
      },
      role: String,
      startDate: Date,
      endDate: Date
    },
    experience: {
      yearsOfExperience: Number,
      previousDisasters: [String]
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'training', 'suspended'],
      default: 'active'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  };