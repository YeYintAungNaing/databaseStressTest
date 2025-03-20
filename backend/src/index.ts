import express from "express"
import db from "./db"
import cors from "cors"

const app = express()
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Authorization", "Content-Type"],
}))

app.get("/products", async (req , res) => {
    try{
        let orderClause : string; 
        const sortBy =  req.query.sortBy as string || ""
        const limit = parseInt(req.query.limit as string) || 16;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * limit;
    

        switch (sortBy) {
            case "reviews_asc":
              orderClause = `ORDER BY reviews ASC`;
              break;
            case "reviews_desc":
              orderClause = `ORDER BY reviews DESC`;
              break;
            case "price_asc":
              orderClause = `ORDER BY price ASC`;
              break;
            case "price_desc":
              orderClause = `ORDER BY price DESC`;
              break;
            case "title_asc":
              orderClause = `ORDER BY title ASC`;
              break;
            case "title_desc":
              orderClause = `ORDER BY title DESC`;
              break;
            case "stars_asc":
              orderClause = `ORDER BY stars ASC`;
              break;
            case "stars_desc":
              orderClause = `ORDER BY stars DESC`;
              break;
            default:
              orderClause = "ORDER BY reviews ASC"; 
        }

        const result = await db.query(
            `SELECT * FROM "120k_products" ${orderClause} LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        res.status(200).json(result.rows);
    }
    catch(e) {
        res.status(500).json({message : "Server error"})
        console.log(e)
    }
})


app.get("/products/search", async (req, res) => {
    
    try{
        const searchQuery = req.query.searchQuery as string
        console.log(searchQuery)
        const limit = parseInt(req.query.limit as string) || 16;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * limit;

        const result = await db.query(
            `SELECT * FROM "120k_products" WHERE "title" ILIKE $1 LIMIT $2 OFFSET $3`,
            [`%${searchQuery}%`, limit, offset]  
        );
        res.json(result.rows);
    }

    catch(e) {
        res.status(500).json({message : "Server error"})
        console.log(e)
    }
})

app.listen(7000, () => {
    console.log('connected to backend')
})
