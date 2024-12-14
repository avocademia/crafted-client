import { Product } from "../../../../Types"
import { ItemData } from "../../page"
import ItemCard from "../item card/ItemCard"
import styles from './itemDisplay.module.scss'

const ItemDisplay = ({products, items}:{products:Product[], items:ItemData[]}) => {
  return (
    <section className={styles.display}>
        {products.map(product => {

            const matchingItem =  items.find(item => 
                                      item.product_id === product.id &&
                                      item.product_type === product.type
                                  )
            if (matchingItem) {
                return  ( <article key={product.id} className={styles.itemContainer}>
                              <input type="checkbox" name="" id="" />
                              <ItemCard product={product} item={matchingItem}/>
                          </article>
                        )
            }
        })}
    </section>
  )
}
export default ItemDisplay