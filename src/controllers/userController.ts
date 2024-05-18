import { Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";
import User from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import crypto from "crypto";
import { signToken } from "../utils/signToken";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Fonction pour enregistrer un nouvel utilisateur
export const registerUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { password } = req.body;
    if (!password.match(passwordRegex)) {
      return res
        .status(400)
        .send(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
        );
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1d",
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fonction pour récupérer les utilisateurs
export const getUserProfile = async (req: ExtendedRequest, res: Response) => {
  res.send(req.user);
};

// Fonction pour mettre à jour le profil d'un utilisateur
export const updateUserProfile = async (
  req: ExtendedRequest,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).send({ error: "User not authenticated" });
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "middleName",
    "lastName",
    "email",
    "phone",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => {
      if (req.user && update in req.user) {
        (req.user as any)[update] = req.body[update];
      }
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Fonction pour mot de passe oublié
export const forgotPassword = async (req: ExtendedRequest, res: Response) => {
  console.log("i am in forgot password function");
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found with this email");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  console.log("resetToken:", resetToken);

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/reset-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.`;
  console.log("resetURL:", resetURL);

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).send({ message: "Token sent to email!" });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res
      .status(500)
      .send("There was an error sending the email. Try again later!");
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (req: ExtendedRequest, res: Response) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send("Token is invalid or has expired");
  }

  const { password } = req.body;
  if (!password.match(passwordRegex)) {
    return res
      .status(400)
      .send(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = signToken(user._id);
  res.status(200).send({ token });
};
