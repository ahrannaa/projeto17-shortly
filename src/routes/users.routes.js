import { Router } from "express"
import { signUp, signIn, getUsers } from "../controllers/users.controllers.js"
import { usersValidation, signInValidation } from "../middlewares/users.Validation.middlewares.js"
import { authRoutesValidation} from "../middlewares/urls.Validation.middlewares.js"
const usersRoutes = Router()

usersRoutes.post("/signup", usersValidation, signUp)
usersRoutes.post("/signin", signInValidation, signIn)
usersRoutes.get("/users/me", authRoutesValidation, getUsers)

export default usersRoutes