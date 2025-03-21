import { useEffect, useState } from "react"
import { API_BASE_URL } from "../config";
import "../../styles/Home.scss"
import axios from "axios";
import { useSearchParams } from "react-router-dom";


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
    const [searchInput, setSearchInput] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get("sortBy") || "reviews_desc";
    const currentPage = parseInt(searchParams.get("page") || "1");

    useEffect(() => {
        const fetchProducts = async () => {
            const searchQuery = searchParams.get("searchQuery") || "";  // this will only exist fi user click search button
            const sortBy = searchParams.get("sortBy") || "reviews_desc";
            const page = Number(searchParams.get("page")) || 1;
        
            const params: Record<string, string | number> = {
                sortBy,
                page,
                limit: 16,
            };
        
            let endpoint = `${API_BASE_URL}/products`;
            if (searchQuery.length >= 4) {
                endpoint = `${API_BASE_URL}/products/search`;
                params.searchQuery = searchQuery;
            }
        
            const response = await axios.get(endpoint, { params });
            setProducts(response.data as Product[]);
        };
      
        fetchProducts();
    }, [searchParams]);
    
    async function searchProducts() {
        if (searchInput.trim().length < 4) return;

        const newParams = new URLSearchParams(searchParams);
        newParams.set("searchQuery", searchInput);
        newParams.set("page", "1"); 
        setSearchParams(newParams);
    }

    const incrementPage = () => {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          const page = parseInt(next.get("page") || "1");
          next.set("page", (page + 1).toString());
          return next;
        });
    };
      
    const decrementPage = () => {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          const page = parseInt(next.get("page") || "1");
          if (page > 1) next.set("page", (page - 1).toString());
          return next;
        });
    };

    function handleSortChange(newSort: string) {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("sortBy", newSort);
        nextParams.set("page", "1");
        setSearchParams(nextParams);
    };

    function clearResults() {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("searchQuery");
        setSearchParams(newParams);
        setSearchInput("");
    }


    return (
        <div className="home">
            <div>
                <div className="dropdown-container">
                    <select value={sort} onChange={(e) => handleSortChange(e.target.value)}>
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    <button onClick={searchProducts}>search</button>
                    <button onClick={clearResults}>Clear results</button>
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
