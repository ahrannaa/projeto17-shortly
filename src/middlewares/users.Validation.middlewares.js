import connection from "../database/db.js"
import { usersSchema, signInSchema } from "../models/users.models.js"
import { status } from "../utils/status.js"

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

    const user = await connection.query("SELECT * FROM users WHERE email=$1", [email])
    if (user.rows.length != 0) {
        res.sendStatus(status.CONFLICT)
        return
    }

     next()
}
export async function signInValidation(req, res, next) {
    const { email, password } = req.body

    const validation = signInSchema.validate({ email, password }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(status.UNPROCESSABLE).send(erros)
        return
    }
   
     next()
}

