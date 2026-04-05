function roleMiddleware(...allowedRoles) {
  return function checkRole(request, response, next) {
    if (!request.user || !allowedRoles.includes(request.user.role)) {
      return response.status(403).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    next();
  };
}

module.exports = roleMiddleware;
