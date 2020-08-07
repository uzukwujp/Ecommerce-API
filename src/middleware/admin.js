const admin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ errorMessage: "Access denied" });
  }
};

export default admin;
