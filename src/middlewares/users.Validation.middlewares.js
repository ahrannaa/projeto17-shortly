import connection from "../database/db.js"
import { usersSchema } from "../models/users.models.js"
import { status } from "../utils/status.js"
import bcrypt from "bcrypt"

export async function usersValidation(req, res, next) {
    const { name, email, password, confirmPassword } = req.body

    const validation = usersSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(status.UNPROCESSABLE).send(erros)
        return
    }
   
    if (password != confirmPassword){
        res.status(status.BAD_REQUEST).send("senhas diferentes")
        return
    }
      const hashPassword = bcrypt.hashSync(password,10)
     console.log(hashPassword)

    const user = await connection.query("SELECT * FROM users WHERE email=$1", [email])
    if (user.rows.length != 0) {
        res.sendStatus(status.CONFLICT)
        return
    }

     next()
}