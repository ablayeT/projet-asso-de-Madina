import { Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";
import User from "../models/Users";

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour supprimer un utilisateur
export const deleteUser = async (req: ExtendedRequest, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
