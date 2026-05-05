import { Request, Response, NextFunction } from "express";
import pool from "../config/database";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      "SELECT id FROM admins WHERE \"userId\" = $1",
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (error) {
    console.error("isAdmin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
