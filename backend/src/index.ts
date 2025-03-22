import express, { query } from "express"
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
        const limit : number = parseInt(req.query.limit as string) || 16;
        const page : number = parseInt(req.query.page as string) || 1;
        const offset : number = (page - 1) * limit;
        const sortBy =  req.query.sortBy as string || "reviews_desc"
        const orderClause : string = getOrderClause(sortBy)
        const filteredBy  = req.query.filteredBy as string || ""

        let queryString;
        let queryParams : any = [limit, offset];
        

        if (filteredBy) {
          queryString = `
            SELECT * FROM "120k_products" 
            WHERE category = $1
            ${orderClause} 
            LIMIT $2 OFFSET $3
          `;
          queryParams = [filteredBy, ...queryParams]; 
        } 
        else {
          queryString = `
            SELECT * FROM "120k_products"
            ${orderClause} 
            LIMIT $1 OFFSET $2
          `;
        }
        
        const result = await db.query(queryString, queryParams);
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
        const limit : number = parseInt(req.query.limit as string) || 16;
        const page : number = parseInt(req.query.page as string) || 1;
        const offset : number = (page - 1) * limit;
        const sortBy =  req.query.sortBy as string || "reviews_desc"
        const filteredBy  = req.query.filteredBy as string || ""
        const orderClause : string = getOrderClause(sortBy)
        
        let queryString;
        let queryParams : any = [`%${searchQuery}%`, limit, offset];
        

        if (filteredBy) {
          queryString = `
            SELECT * FROM "120k_products" 
            WHERE category = $1 AND "title" ILIKE $2
            ${orderClause} 
            LIMIT $3 OFFSET $4
          `;
          queryParams = [filteredBy, ...queryParams]; 
        } 
        else {
          
          queryString = `
          SELECT * FROM "120k_products" 
          WHERE "title" ILIKE $1 ${orderClause} 
          LIMIT $2 OFFSET $3`;
        }

        const result = await db.query(queryString, queryParams);
        //console.log(result)
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
