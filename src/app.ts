import dotenv from "dotenv";
import path from "path";

// Charger les variables d'environnement en fonction de NODE_ENV
const envFile = `.env.${process.env.NODE_ENV}` || ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log("Environment variables loaded:", process.env.JWT_SECRET); // Ajoutez ce log pour vérifier

import connectMongo from "./middlewares/connectMongo";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import meetingRoutes from "./routes/meetingRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

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

console.log("Database URI:", process.env.DB_URI_TEST);

// Démarrage du serveur uniquement si le script est exécuté directement
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
