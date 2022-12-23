import connection from "../database/db.js"
import { urlsSchema } from "../models/urls.models.js"
import { status } from "../utils/status.js"


export async function urlsValidation(req, res, next) {
    const { url } = req.body

    const validation = urlsSchema.validate({ url }, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message)
        res.status(status.UNPROCESSABLE).send(erros)
        return
    }

    next()
}

export async function authRoutesValidation(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "");
    
    if(!token){
        res.sendStatus(status.UNAUTHORIZED)
        return
    }

    try {
        const sessionResult = await connection.query("SELECT * FROM sessions WHERE token = $1", [token])

        if(sessionResult.rows.length == 0){
            res.status(status.UNAUTHORIZED).send("Token não existe")
            return
        }
        res.locals.userId = sessionResult.rows[0].userId


    } catch(err) {
        console.log(err);
        res.sendStatus(status.SERVER_ERROR);
    }
    

    next()
}

