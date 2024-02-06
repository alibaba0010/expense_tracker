import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unaunthenticated.js";
import UnAuthorizedError from "../errors/unauthorized.js";

import User from "../model/user/user.mongo.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (req.session.jwt) {
    token = req.session.jwt;
  } else if (authHeader) {
    if (authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
  } else {
    throw new UnauthenticatedError("Please login in to create a token");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SEC);
    // if (decode.exp < Date.now() / 1000) {
    //   throw new UnauthenticatedError("Token has expired");
    // }
    req.user = { userId: decode.userId, isAdmin: decode.isAdmin };

    next();
  } catch (err) {
    req.session = null;
    throw new UnauthenticatedError("Unable to authorize access, login again");
  }
};

// VERIFY USERS
export async function verifyUser(req, res, next) {
  const user = await User.findById(req.user.userId).select("-password");
  if (user) {
    next();
  } else {
    throw new UnAuthorizedError("Please login to access");
  }
}

// VERIFY ADMIN
export async function verifyAdmin(req, res, next) {
  const user = await User.findById(req.user.userId).select("-password");
  if (user || user.isAdmin === true) {
    next();
  } else {
    throw new UnAuthorizedError("Only admin is ascessible");
  }
}
