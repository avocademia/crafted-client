import { Product } from "../../../../Types"
import ProductCard from "../product card/ProductCard"

const ProductDisplay = ({searchResults}:{searchResults: Product[]}) => {

    const results = searchResults.map(product => <ProductCard product={product}/>)
    const content = results.length? results: <div><p>No Matches</p></div>

    return (
        <article>{content}</article>
    )
}

export default ProductDisplay