import express from "express";
import { getDashboardStats } from "../controllers/StatsController";

const router = express.Router();

/**
 * @swagger
 * /dashboard-stats:
 *   get:
 *     summary: Get a list of Stats
 *     description: Retrieve a list of all Stats available in the system.
 *     tags:
 *       - Stats
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       200:
 *         description: A list of Stats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier of the role
 *                     example: "610c72f2e9161b001ce5d524"
 *                   name:
 *                     type: string
 *                     description: The name of the role
 *                     example: "Admin"
 *       401:
 *         description: Unauthorized access, JWT token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/dashboard-stats", getDashboardStats);

module.exports = router