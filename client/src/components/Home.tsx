import { useEffect, useState } from "react"
import { API_BASE_URL } from "../config";
import "../../styles/Home.scss"
import axios from "axios";


// todo :  change the frontend url when sorting/filterig request '
// still use states for queries , user clicks search - change url with that new query - make usesearchParam url dependancy for useeffect - 
// useeffect will fetch data with the values in url instead

interface Product{
    id : string;
    title : string;
    img_url : string;
    product_url : string;
    stars : number;
    reviews : number;
    price : number;
    is_bestseller : boolean;
    categoryname : string
}

const SORT_OPTIONS = [
    { label: "Highest Reviews", value: "reviews_desc" },
    { label: "Lowest Reviews", value: "reviews_asc" },
    { label: "Highest Price", value: "price_desc" },
    { label: "Lowest Price", value: "price_asc" },
    { label: "A-Z Title", value: "title_asc" },
    { label: "Z-A Title", value: "title_desc" },
    { label: "Rating High to Low", value: "stars_desc" },
    { label: "Rating Low to High", value: "stars_asc" },
]

export default function Home() {

    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sort, setSort] = useState<string>("reviews_desc")
    const [searchQuery, setSearchQuery] = useState<string>("")


    useEffect(() => {
        fetchProducts()
        console.log('fetched')
    }, [currentPage])

    async function fetchProducts() {
        try{
            const response  = await axios.get(`${API_BASE_URL}/products?limit=16&page=${currentPage}&sortBy=${sort}`)
            setProducts(response.data as Product[])

        }
        catch(e) {
            console.log(e)
        }
    }
    
    async function searchProducts() {
        if (searchQuery.length < 4) {
            console.log('must be longer than 4 chracters')
            return
        }
        try{
            const response = await axios.get(`${API_BASE_URL}/products/search?limit=16&page=${currentPage}&searchQuery=${searchQuery}`);
            setProducts(response.data as Product[])
        }
        catch(e) {
            console.log(e)
        }
    }

    function incrementPage() {
        //console.log('d')
        setCurrentPage((prev) => prev+1 )
    }

    function decrementPage() {
        if (currentPage != 1) {
            setCurrentPage((prev) => prev-1)
        } 
    }
    //console.log(sort)

    return (
        <div className="home">
            <div>
                <button onClick={fetchProducts}>fetch</button>
                <div className="dropdown-container">
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button onClick={searchProducts}>search</button>
                </div>
            </div>
            <div className="products">
            {
               products && products.length > 0 && (
                products.map((product, i)=> (
                    <div className="productCard" key={i}>
                        <img src={product.img_url} alt=""></img>
                        <p>{product.title}</p>
                        <div className="productInfo">
                            <div>{`${product.price}$`}</div>
                            <div>{product.stars}</div>
                        </div>
                    </div>
                ))
               )
            }
            </div>
            <div className="pages">
                <button onClick={decrementPage}>-</button>
                <p>{currentPage}</p>
                <button onClick={incrementPage}>+</button>
            </div>
        </div>
    )
}
