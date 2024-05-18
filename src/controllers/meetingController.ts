import { Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";
import Meeting from "../models/Meeting";

// Fonction pour créer une réunion
export const createMeeting = async (req: ExtendedRequest, res: Response) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).send(meeting);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Fonction pour obtenir toutes les réunions
export const getMeetings = async (req: ExtendedRequest, res: Response) => {
  try {
    const meetings = await Meeting.find().populate("attendees");
    res.status(200).send(meetings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fonction pour s'inscrire à une réunion
export const joinMeeting = async (req: ExtendedRequest, res: Response) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).send("Meeting not found");
    }

    if (!req.user) {
      return res.status(401).send("User not authenticated");
    }

    meeting.attendees.push(req.user._id);
    await meeting.save();
    res.status(200).send(meeting);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Fonction pour envoyer des notifications
// Vous pouvez ajouter une logique pour envoyer des emails/SMS pour notifier les membres des réunions à venir
