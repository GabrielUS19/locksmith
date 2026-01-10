import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { type Response, type Request } from "express";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);

// 404 EndPoint
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    status: "error",
    message: "Error 404: Page Not Found",
    errors: null,
  });
});

// Middleware de erro global
app.use(errorHandler);

app.listen(5000, () => {
  console.warn("Servidor rodando na porta 5000");
});
