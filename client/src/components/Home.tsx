import { useEffect, useState } from "react"
import { API_BASE_URL } from "../config";
import "../../styles/Home.scss"
import axios from "axios";
import { useSearchParams } from "react-router-dom";


interface Product{
    id : string;
    title : string;
    img_url : string;
    product_url : string;
    stars : number;
    reviews : number;
    price : number;
    is_bestseller : boolean;
    subcategory : string
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

const FILTERED_OPTIONS = [
    { label: "Musical Instruments", value: "Musical Instruments" },
    { label: "Gifts & Occasions", value: "Gifts & Occasions" },
    { label: "Electronics", value: "Electronics" },
    { label: "Home & Living", value: "Home & Living" },
    { label: "Photography & Videography", value: "Photography & Videography" },
    { label: "Home & Garden", value: "Home & Garden" },
    { label: "Toys & Hobbies", value: "Toys & Hobbies" },
    { label: "Sports & Outdoors", value: "Sports & Outdoors" },
    { label: "Health & Personal Care", value: "Health & Personal Care" },
    { label: "Food & Beverage", value: "Food & Beverage" },
    { label: "Other", value: "Other" },
    { label: "Baby & Kids", value: "Baby & Kids" },
    { label: "Office & Stationery", value: "Office & Stationer" },
    { label: "Pets", value: "Pets" },
    { label: "Arts & Crafts", value: "Arts & Crafts" },
    { label: "Grocery & Gourmet", value: "Grocery & Gourmet" },
    { label: "Miscellaneous", value: "Miscellaneous" },
    { label: "Fashion & Apparel", value: "Fashion & Apparel" },
    { label: "Automotive & Accessories", value: "Automotive & Accessories" },
    { label: "Industrial & Tools", value: "Industrial & Tools" }
]

export default function Home() {

    const [products, setProducts] = useState<Product[]>([]);
    const [searchInput, setSearchInput] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get("sortBy") || "reviews_desc";
    const filter = searchParams.get("filteredBy") || "";
    const currentPage = parseInt(searchParams.get("page") || "1");

    useEffect(() => {
        const fetchProducts = async () => {
            const searchQuery = searchParams.get("searchQuery") || "";  // this will only exist fi user click search button
            const filteredBy = searchParams.get("filteredBy") || "";
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
            if (filteredBy) {
                params.filteredBy = filteredBy;
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

    function clearResults() {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("searchQuery");
        setSearchParams(newParams);
        setSearchInput("");
    }

    // function addFilter() {
    //     const newParams = new URLSearchParams(searchParams);
    //     newParams.set("filteredBy", "Electronics")
    //     setSearchParams(newParams);
        
    // }

    function handleSortChange(newSort: string) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sortBy", newSort);
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    function handleFilterChange(newFilter: string) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("filteredBy", newFilter);
        newParams.set("page", "1");
        setSearchParams(newParams);
    };


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
                <div className="dropdown-container">
                    <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
                    {FILTERED_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                    </select>
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
