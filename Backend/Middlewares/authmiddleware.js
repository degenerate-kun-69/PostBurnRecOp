export const authMiddleware = {
    // Verify JWT token
    async verifyToken(req, res, next) {
      try {
        const token = req.headers.authorization?.split(' ')[1];
  
        if (!token) {
          return res.status(401).json({
            success: false,
            message: 'No token provided'
          });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
  
        // Update last activity
        await Auth.updateOne(
          { userId: decoded.userId, 'sessions.token': token },
          { $set: { 'sessions.$.lastActivity': new Date() } }
        );
  
        next();
      } catch (error) {
        res.status(401).json({
          success: false,
          message: 'Invalid token',
          error: error.message
        });
      }
    },
  
    // Check user type
    checkUserType(allowedTypes) {
      return (req, res, next) => {
        if (!allowedTypes.includes(req.user.userType)) {
          return res.status(403).json({
            success: false,
            message: 'Unauthorized user type'
          });
        }
        next();
      };
    }
  };
  