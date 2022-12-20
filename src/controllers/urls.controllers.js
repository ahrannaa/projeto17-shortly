import { nanoid } from "nanoid"
import connection from "../database/db.js"

export async function shortUrl(req, res) {
    const { url } = req.body
    
 try {
       const shortUrl = nanoid(6)
       const result = {shortUrl,url}       
       const count = 0
     
       await connection.query(`INSERT INTO urls ("userId", url, "shortUrl", "visitCount") VALUES ($1,$2,$3,$4)`, [res.locals.userId, result.url, result.shortUrl, count])
       
       res.status(201).send({ shortUrl: result.shortUrl })
      
    
   } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }

}
export async function getUrlId(req, res) {}
export async function getShortUrl(req, res) {}
export async function deleteUrl(req, res) {}
