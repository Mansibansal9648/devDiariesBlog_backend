import express from "express";
import { body } from "express-validator";

const loginUserSchema = [
  body("username_email")
    .notEmpty()
    .withMessage("Email or Username is required field"),
  body("password").notEmpty().withMessage("Password is required field"),
];

const signupUserSchema = [
  body("username")
    .notEmpty()
    .withMessage("Username is required field")
    .bail()
    .matches(/^[a-zA-Z0-9_-]{3,25}$/)
    .withMessage("Invalid username format"),
  body("name")
    .notEmpty()
    .withMessage("Name is required field")
    .bail()
    .matches(/^[a-zA-Z\s]{3,25}$/)
    .withMessage("Invalid name format"),
  body("email")
    .notEmpty()
    .withMessage("Email is required field")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required field")
    .bail()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/
    )
    .withMessage("Invalid password format"),
];

export { loginUserSchema, signupUserSchema };
