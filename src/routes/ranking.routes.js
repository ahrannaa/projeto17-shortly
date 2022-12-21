import { Router } from "express"
import { getRanking } from "../controllers/ranking.controllers.js"

const rankingRoutes = Router()

rankingRoutes.get("/ranking", getRanking)

export default rankingRoutes