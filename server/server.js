import './config/instrument.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config'
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controller/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';
import JobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

await connectDB();
await connectCloudinary();

app.use(cors({
  origin: [
    'https://job-portal-ordg.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API Working"));

app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', JobRoutes)
app.use('/api/users', userRoutes)

Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
