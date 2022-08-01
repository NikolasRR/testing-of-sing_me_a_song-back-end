import { Router } from "express";

import { resetDatabase, seedRecommendation, seedRecommendations } from "../controllers/testsController.js";

const testRouter = Router();

testRouter.post('/seed/recommendations', seedRecommendations);
testRouter.post('/seed/recommendation', seedRecommendation);
testRouter.post('/resetDB', resetDatabase);

export default testRouter;