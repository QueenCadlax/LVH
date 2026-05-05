import { Request, Response } from 'express';
import pool from '../config/database';

// List all agents (admin only)
export const listAgents = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id,
        a."userId",
        u.email,
        u."firstName",
        u."lastName",
        a."currentTarget",
        a."monthlyProgress",
        a.earnings,
        a.achievements,
        a."createdAt",
        a."updatedAt"
      FROM agents a
      JOIN users u ON a."userId" = u.id
      ORDER BY a.earnings DESC
    `);

    res.json({
      success: true,
      data: result.rows,
      message: 'Agents retrieved successfully'
    });
  } catch (error: any) {
    console.error('List agents error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve agents'
    });
  }
};

// Get agent by ID
export const getAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        a.id,
        a."userId",
        u.email,
        u."firstName",
        u."lastName",
        a."currentTarget",
        a."monthlyProgress",
        a.earnings,
        a.achievements,
        a."createdAt",
        a."updatedAt"
      FROM agents a
      JOIN users u ON a."userId" = u.id
      WHERE a.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Agent retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get agent error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve agent'
    });
  }
};

// Update agent target (admin only)
export const updateAgentTarget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentTarget } = req.body;

    if (!currentTarget || currentTarget < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid target value'
      });
    }

    // Verify agent exists
    const agentCheck = await pool.query(
      'SELECT id FROM agents WHERE id = $1',
      [id]
    );

    if (agentCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }

    // Update target
    const result = await pool.query(`
      UPDATE agents
      SET "currentTarget" = $1, "updatedAt" = NOW()
      WHERE id = $2
      RETURNING *
    `, [currentTarget, id]);

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Agent target updated successfully'
    });
  } catch (error: any) {
    console.error('Update agent target error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update agent target'
    });
  }
};

// Update monthly progress
export const updateAgentProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { monthlyProgress } = req.body;

    if (monthlyProgress === undefined || monthlyProgress < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid progress value'
      });
    }

    const result = await pool.query(`
      UPDATE agents
      SET "monthlyProgress" = $1, "updatedAt" = NOW()
      WHERE id = $2
      RETURNING *
    `, [monthlyProgress, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Agent progress updated successfully'
    });
  } catch (error: any) {
    console.error('Update agent progress error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update agent progress'
    });
  }
};

// Get agent progress (agent view own, admin view any)
export const getAgentProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const result = await pool.query(`
      SELECT 
        a.id,
        a."userId",
        a."currentTarget",
        a."monthlyProgress",
        ROUND((a."monthlyProgress"::numeric / NULLIF(a."currentTarget", 0) * 100)::numeric, 2) as "progressPercentage",
        a.earnings,
        a.achievements,
        a."updatedAt"
      FROM agents a
      WHERE a.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Agent progress retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get agent progress error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve agent progress'
    });
  }
};

// Add achievement badge
export const addAchievement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { achievement } = req.body;

    if (!achievement || typeof achievement !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid achievement'
      });
    }

    const result = await pool.query(`
      UPDATE agents
      SET achievements = array_append(achievements, $1), "updatedAt" = NOW()
      WHERE id = $2
      RETURNING *
    `, [achievement, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Achievement added successfully'
    });
  } catch (error: any) {
    console.error('Add achievement error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to add achievement'
    });
  }
};
