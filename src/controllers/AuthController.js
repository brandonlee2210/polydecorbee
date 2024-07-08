import User from "../models/User.js";
import jwt from "jsonwebtoken";
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // duplicate username error
  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  // incorrectusername
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
    return errors;
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Password is not correct";
    return errors;
  }
};

const maxAge = 3 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, "Giabao2001", {
    expiresIn: maxAge,
  });
};

// controller actions
export const signup_get = (req, res) => {
  res.render("signup");
};

export const login_get = (req, res) => {
  res.render("login");
};

export const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
