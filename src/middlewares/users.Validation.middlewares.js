import connection from "../database/db.js"
import { usersSchema } from "../models/users.models.js"

export async function usersValidation(req, res, next){
    const {name, email, password, confirmPassword} = req.body

    const validation  = usersSchema.validate({name, email, password, confirmPassword}, {abortEarly: false})

    if(validation.error){
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(422).send(erros)
        return
    }

    const user = await connection.query("SELECT * FROM users WHERE email=$1",[email]) 
    if(user.rows.lenght != 0){
        res.status(409).send("Email já cadastrado!")
        return
    }

    next()
}