import { Router } from "express"
import { signUp, signIn, getUsers } from "../controllers/users.controllers.js"
import { usersValidation } from "../middlewares/users.Validation.middlewares.js"



const usersRoutes = Router()

usersRoutes.post("/signup", usersValidation, signUp)
usersRoutes.post("/signin", signIn)
usersRoutes.get("/users/me", getUsers)

export default usersRoutes