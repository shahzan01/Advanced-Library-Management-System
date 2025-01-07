import prisma from "../config/db";
import jwt, { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import { mailSender } from "./../utils/mailSender";
import emailTemplate from "../mail/templates/emailVerificationTemplate";
dotenv.config();

//sendotp

const sendotp = async (req: Request, res: Response) => {
  try {
    const userId = req.user;

    const user = await prisma.user.findFirst({
      where: { id: userId?.id },
    });

    const email = user?.email || "";
    if (user?.emailVerified === true) {
      res.status(401).json({
        success: false,
        message: "User is already verified.",
      });
      return;
    }

    const existingOtp = await prisma.otp.findFirst({
      where: { email },
    });

    if (existingOtp) {
      const isOtpExpired = new Date(existingOtp.expiresAt) < new Date();

      if (!isOtpExpired) {
        res.status(400).json({
          success: false,
          message: "OTP already sent. Please wait until it expires.",
        });
        return;
      } else {
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        let otpBody = await prisma.otp.update({
          where: { id: existingOtp.id },
          data: {
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          },
        });
        await sendVerificationEmail(email, otp);
        console.log("Updated OTP:", otpBody);
        res.status(200).json({
          success: true,
          message: "OTP sent successfully.",
        });
        return;
      }
    }

    let otp: string;
    let result: any;

    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await prisma.otp.findFirst({
        where: { email: email, otp: otp },
      });
    } while (result);

    const otpBody = await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    console.log("OTP Body:", otpBody);
    await sendVerificationEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error("Error in sendotp:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

//send Verification Email with otp

async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

//verifyEmail

const verifyEmail = async (req: Request, res: Response) => {
  const userId = req.user;
  const otp = req.body.otp;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId?.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    if (user.emailVerified) {
      res.status(400).json({
        success: false,
        message: "User is already verified.",
      });
      return;
    }

    const otpVerify = await prisma.otp.findFirst({
      where: {
        email: user.email,
        expiresAt: { gte: new Date() },
      },
    });

    if (!otpVerify || otpVerify.otp !== otp) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP. Please request a new OTP.",
      });
      return;
    }

    await prisma.user.update({
      where: { id: userId?.id },
      data: { emailVerified: true },
    });

    await prisma.otp.delete({
      where: { id: otpVerify.id },
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
    return;
  } catch (error) {
    console.error("Error in email verification:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
    return;
  }
};

export { sendotp, verifyEmail };
