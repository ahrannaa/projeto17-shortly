import connection from "../database/db.js"
import { status } from "../utils/status.js"
import bcrypt from "bcrypt"
import {v4 as uuidV4} from "uuid"

export async function signUp(req, res) {
    const { name, email, password } = req.body

   try {
        const hashPassword = bcrypt.hashSync(password,10)
        await connection.query("INSERT INTO users ( name, email, password) VALUES ($1,$2,$3)", [name, email, hashPassword])
        res.sendStatus(status.CREATED)
       
    } catch(err){
        console.log(err)
        res.sendStatus(status.SERVER_ERROR)
    }
}
export async function signIn(req, res) {
    const {email, password} = req.body
    const token = uuidV4()

    try {
     const userResult = await connection.query("SELECT * FROM users WHERE email = $1", [email])
     console.log(userResult)
     if(userResult.rows.length == 0) {
        res.sendStatus(status.UNAUTHORIZED)
        return 
    }
    
    const passwordOK = bcrypt.compareSync(password,userResult.rows[0].password )
    console.log(passwordOK)
    if(passwordOK == 0) {
        res.sendStatus(status.UNAUTHORIZED)
        return
    }

    const result = await connection.query(`SELECT * FROM sessions WHERE "userId" = $1`,[userResult.rows[0].id ])
     if(result.rows.length == 0) {
        await connection.query(`INSERT INTO sessions( "userId", token ) VALUES ($1,$2)`, [userResult.rows[0].id, token])
        res.send(token)
        return
    }
    res.send(result.rows[0].token)

    } catch(err) {
        console.log(err)
        res.sendStatus(status.SERVER_ERROR)  
    }


 }
export async function getUsers(req, res) { }
