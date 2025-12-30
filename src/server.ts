import express, { type Response, type Request } from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// 404 EndPoint
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "Error 404: Page Not Found" });
});

app.listen(5000, () => {
  console.warn("Servidor rodando na porta 5000");
});
