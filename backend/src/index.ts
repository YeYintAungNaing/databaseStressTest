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

app.get("/products", async (req, res) => {
    try{
        const limit = parseInt(req.query.limit as string) || 16;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * limit;
        
        const result = await db.query(
            'SELECT * FROM "120k_products" ORDER BY reviews DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        res.status(200).json(result.rows);
    }
    catch(e) {
        res.status(500).json({message : "Server error"})
        console.log(e)
    }
})

app.listen(7000, () => {
    console.log('connected to backend')
})
