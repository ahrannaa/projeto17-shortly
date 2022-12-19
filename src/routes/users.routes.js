import { Router } from "express"
import { postSignUp, postSignIn, getUsers } from "../controllers/users.controllers.js"


const usersRoutes = Router()

usersRoutes.post("/signup", postSignUp)
usersRoutes.post("/signin", postSignIn)
usersRoutes.get("/users/me", getUsers)

export default usersRoutes