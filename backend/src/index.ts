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

function getOrderClause(sortBy : string) : string {

  switch (sortBy) {
    case "reviews_asc":
      return `ORDER BY reviews ASC`;

    case "reviews_desc":
      return `ORDER BY reviews DESC`;

    case "price_asc":
      return `ORDER BY price ASC`;
      
    case "price_desc":
      return`ORDER BY price DESC`;
      
    case "title_asc":
      return `ORDER BY title ASC`;

    case "title_desc":
      return `ORDER BY title DESC`;

    case "stars_asc":
      return`ORDER BY stars ASC`;

    case "stars_desc":
      return `ORDER BY stars DESC`;

    default:
      return "ORDER BY reviews DESC"; 
  }
}

app.get("/products", async (req , res) => {
    try{ 
        const limit = parseInt(req.query.limit as string) || 16;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * limit;
        const sortBy =  req.query.sortBy as string || "reviews_desc"
        const orderClause : string = getOrderClause(sortBy)
        
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
        const limit = parseInt(req.query.limit as string) || 16;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * limit;
        const sortBy =  req.query.sortBy as string || "reviews_desc"
        const orderClause : string = getOrderClause(sortBy)

        const result = await db.query(
            `SELECT * FROM "120k_products" WHERE "title" ILIKE $1 ${orderClause} LIMIT $2 OFFSET $3`,
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
