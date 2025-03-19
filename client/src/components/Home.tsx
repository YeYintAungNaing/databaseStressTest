import { useEffect, useState } from "react"
import { API_BASE_URL } from "../config";
import "../../styles/Home.scss"

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

export default function Home() {

    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)


    useEffect(() => {
        fetchProducts()
        console.log('fetched')
    }, [currentPage])

    async function fetchProducts() {
        try{
            const response  = await axios.get(`${API_BASE_URL}/products?limit=16&page=${currentPage}`)
            setProducts(response.data as Product[])

        }
        catch(e) {
            console.log(e)
        }
    }

    function incrementPage() {
        setCurrentPage((prev) => prev+1 )
    }

    function decrementPage() {
        if (currentPage != 1) {
            setCurrentPage((prev) => prev-1)
        } 
    }

    return (
        <div className="home">
            <button onClick={fetchProducts}>fetch</button>
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
            <div>
                <button onClick={decrementPage}>-</button>
                <p>{currentPage}</p>
                <button onClick={incrementPage}>+</button>
            </div>
        </div>
    )
}
