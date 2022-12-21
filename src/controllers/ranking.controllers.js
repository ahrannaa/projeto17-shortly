import connection from "../database/db.js"

export async function getRanking (req, res) {
 
    const ranking = await connection.query(`SELECT users.id, users.name, COUNT(urls.url) AS "linkCount", SUM(urls."visitCount") AS "visitCount" FROM users
    JOIN urls ON urls."userId" = users.id
    GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`)
    

    res.status(200).send(ranking.rows)
}