import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();




const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const emailTemplateRoutes = require("./emailTemplateRoutes");
const itemOneRoutes = require("./itemOneRoutes");
const rolesRoutes = require("./rolesRoutes");


router.use(authRoutes);
// router.use(verifyToken);
router.use(userRoutes);
router.use(emailTemplateRoutes);
router.use(itemOneRoutes);
router.use(rolesRoutes);






module.exports = router;