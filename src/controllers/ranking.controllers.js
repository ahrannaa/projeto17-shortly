import connection from "../database/db.js"

export async function getRanking (req, res) {
 
    const rankingResult = await connection.query(`SELECT users.id, users.name, COUNT(urls.url) AS "linkCount", SUM(urls."visitCount") AS "visitCount" FROM users
    LEFT JOIN urls ON urls."userId" = users.id
    GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`)

   const ranking = rankingResult.rows.map((row) => ( { ...row, linkCount: Number(row.linkCount),visitCount: Number(row.visitCount)}))
   
    res.status(200).send(ranking)
}