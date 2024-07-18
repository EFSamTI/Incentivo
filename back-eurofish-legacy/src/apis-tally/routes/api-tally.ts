import { get } from "http";
import { getApisTallyCtrl, postApisTallyCtrl } from "../controllers/api-tally";
import { Router } from "express";


const routeApisTally = Router();

routeApisTally.get('/apis/tally', getApisTallyCtrl);
routeApisTally.post('/apis/tally', postApisTallyCtrl);

export { routeApisTally };