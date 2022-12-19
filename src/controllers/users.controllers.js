import connection from "../database/db.js"
import { status } from "../utils/status.js"

export async function signUp(req, res) {
    const { name, email, password } = req.body

   try {
        const user = await connection.query("INSERT INTO users ( name, email, password) VALUES ($1,$2,$3)", [name,email,password])
        res.sendStatus(status.CREATED)
       
    } catch(err){
        console.log(err)
        res.sendStatus(status.SERVER_ERROR)
    }
}
export async function signIn(req, res) {
    
 }
export async function getUsers(req, res) { }
