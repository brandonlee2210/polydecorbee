import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, "polydecor", (err, decoded) => {
      if (err) {
        console.error(err.message);
        res.json({ error: "Unauthorized" })
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.json({ error: "Unauthorized" });
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  res.locals.user = null;

  if (token) {
    jwt.verify(token, "polydecor", async (err, decoded) => {
      if (err) {
        console.error(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decoded.id);
        res.locals.user = user;
        console.log(res.locals);
        next();
      }
    });
  } else {
    next();
  }
};

export const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  res.locals.user = null;

  console.log("token", token);

  if (token) {
    jwt.verify(token, "polydecor", async (err, decoded) => {
      if (err) {
        console.error(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decoded.id);
        res.locals.user = user;
        if (user.role === "admin") {
          next();
        } else {
          res
            .status(400)
            .json({ error: "Bạn không có quyền thực hiện hành động này" });
        }
      }
    });
  }

  res.status(400).json({ error: "Bạn không có quyền thực hiện hành động này" });
};
