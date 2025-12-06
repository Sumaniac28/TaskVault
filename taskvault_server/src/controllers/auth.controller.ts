import { Request, Response } from "express";
import AppDataSource from "@/config/supabase";
import { User } from "@/entities/user.entity";
import { hashPassword, comparePassword } from "@/utils/password.util";
import { generateToken } from "@/utils/token.util";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = userRepo.create({
      email,
      password: hashedPassword,
    });

    await userRepo.save(user);

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { id: userId },
      select: ["id", "email", "createdAt", "updatedAt"],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch user",
    });
  }
};

export const logout = async (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

