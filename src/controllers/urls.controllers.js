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
export async function getUrlId(req, res) {
    const { id } = req.params
    try {
        const url = await connection.query(`SELECT urls.id, urls."shortUrl", urls.url FROM urls WHERE id =$1`,[id])
     
        if (url.rows.length == 0){
            res.sendStatus(404)
            return
        }

        res.status(200).send(url.rows)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }

}
export async function getShortUrl(req, res) {
    const { shortUrl } = req.params
   try {
    const url = await connection.query(`SELECT urls.url, urls."visitCount" FROM urls WHERE "shortUrl"=$1 `, [shortUrl])
    console.log(url)
   
    if(url.rows.length == 0){
        res.sendStatus(404)
        return
    }

   await connection.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1`, [shortUrl])
   res.redirect(url.rows[0].url)

   } catch(err) {
    console.log(err)
    res.sendStatus(500)
   }

}
export async function deleteUrl(req, res) {
    
}
