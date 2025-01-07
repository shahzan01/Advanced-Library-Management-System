import prisma from "../config/db";
import jwt, { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

dotenv.config();

//Signup

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
      return;
    }
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
    });
    res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
    return;
  } catch {
    res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
    return;
  }
};

//Login

const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: email, role: role },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
      return;
    }

    const secret: string =
      req.body.role === "ADMIN"
        ? process.env.JWT_SECRET_ADMIN || "default_admin_secret"
        : process.env.JWT_SECRET_MEMBER || "default_member_secret";

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        secret,
        {
          expiresIn: "24h",
        }
      );

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
      return;
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
    return;
  }
};

export { signup, login };
