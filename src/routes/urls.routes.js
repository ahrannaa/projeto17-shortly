import { Router } from "express"
import {shortUrl,getUrlId, getShortUrl, deleteUrl  } from "../controllers/urls.controllers.js"


const urlsRoutes = Router()

urlsRoutes.post("/urls/shorten", shortUrl)
urlsRoutes.get("/urls/:id",getUrlId )
urlsRoutes.get("/urls/open/:shortUrl", getShortUrl)
urlsRoutes.delete("/urls/:id", deleteUrl)

export default urlsRoutes