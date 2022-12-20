import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import usersRoutes from "./routes/users.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(usersRoutes)
app.use(urlsRoutes)

const port = process.env.PORT || 4000
app.listen (port, () => console.log(`Server running in port ${port}`))