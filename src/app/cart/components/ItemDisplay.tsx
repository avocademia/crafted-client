import { Product } from "../../../Types"
import ItemCard from "./ItemCard"

const ItemDisplay = ({products}:{products:Product[]}) => {
  return (
    <section>
        {products.map(product => (
            <article>
                <input type="checkbox" name="" id="" />
                <ItemCard product={product}/>
            </article>
        ))}
    </section>
  )
}
export default ItemDisplay