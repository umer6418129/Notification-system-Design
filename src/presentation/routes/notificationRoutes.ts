import express from "express";
import { create, getNotificationTypes } from "../controllers/NotificationController";
import { validate } from "../middleware/validate";
import { NotificationSchema } from "../validation/maintianDatavalidation";

const router = express.Router();

/**
 * @swagger
 * /create-notification:
 *   post:
 *     summary: Create Notification
 *     description: Create a new notification with the specified details
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationType:
 *                 type: string
 *                 enum: [email, inApp, sms]
 *                 description: Type of the notification to be sent
 *                 example: email
 *               message:
 *                 type: string
 *                 description: The content of the notification message
 *                 example: "This is your notification message"
 *               subject:
 *                 type: string
 *                 description: The subject of the email (required only for email type notifications)
 *                 example: "Notification Subject"
 *               whereToSend:
 *                 type: string
 *                 description: The recipient's email or identifier
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the notification creation
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 */
router.post("/create-notification", validate(NotificationSchema), create)
/**
 * @swagger
 * /notification-types:
 *   get:
 *     summary: Types of Notification
 *     description: Types of notification
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Successfully retrieved types
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 */
router.get("/notification-types", getNotificationTypes)

module.exports = router