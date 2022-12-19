import { Router } from "express"
import { signUp, signIn, getUsers } from "../controllers/users.controllers.js"


const usersRoutes = Router()

usersRoutes.post("/signup", signUp)
usersRoutes.post("/signin", signIn)
usersRoutes.get("/users/me", getUsers)

export default usersRoutes