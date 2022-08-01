import { Request, Response } from "express";
import testsServices from "../services/testsServices.js";

export async function seedRecommendations(req: Request, res: Response) {
    await testsServices.seedMany();
    
    res.sendStatus(200);
}

export async function seedRecommendation(req: Request, res: Response) {
    await testsServices.seedOne();
    res.sendStatus(200);
}

export async function resetDatabase(req: Request, res: Response) {
    await testsServices.resetDB();
    res.sendStatus(200);
}