import { Router } from "express"
import {shortUrl,getUrlId, getShortUrl, deleteUrl  } from "../controllers/urls.controllers.js"
import { authRoutesValidation, urlsValidation } from "../middlewares/urls.Validation.middlewares.js"

const urlsRoutes = Router()

urlsRoutes.post("/urls/shorten", authRoutesValidation, urlsValidation, shortUrl)
urlsRoutes.get("/urls/:id",getUrlId )
urlsRoutes.get("/urls/open/:shortUrl", getShortUrl)
urlsRoutes.delete("/urls/:id", authRoutesValidation, deleteUrl)

export default urlsRoutes