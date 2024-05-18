import dotenv from "dotenv";
import path from "path";
const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envPath });
import connectMongo from "./middlewares/connectMongo";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import meetingRoutes from "./routes/meetingRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

console.log("Database URI:", process.env.DB_URI); // Pour vérifier que l'URI est correctement chargée

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour la connexion MongoDB
app.use(connectMongo);

// Route de base pour tester que l'application fonctionne
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript and Express with MongoDB!");
});

// Routes pour les utilisateurs
app.use("/api/users", userRoutes);

// Routes pour les administrateurs
app.use("/api/admin", adminRoutes);

// Routes pour les réunions
app.use("/api", meetingRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
