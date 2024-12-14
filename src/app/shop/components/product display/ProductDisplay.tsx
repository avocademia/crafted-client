import { Product } from "../../../../Types"
import ProductCard from "../product card/ProductCard"
import styles from './productDisplay.module.scss'

const ProductDisplay = ({searchResults}:{searchResults: Product[]}) => {

    const results = searchResults.map(product => <ProductCard product={product}/>)
    const content = results.length? results: <div><p>No Matches</p></div>

    return (
        <section className={styles.display}>{content}</section>
    )
}

export default ProductDisplay