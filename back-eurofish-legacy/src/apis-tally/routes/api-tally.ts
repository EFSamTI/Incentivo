import { get } from "http";
import { getApisTallyCtrl } from "../controllers/api-tally";
import { Router } from "express";


const routeApisTally = Router();

routeApisTally.get('/apis/tally', getApisTallyCtrl);


export { routeApisTally };