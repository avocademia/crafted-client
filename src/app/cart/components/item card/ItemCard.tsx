import { Product } from "../../../../Types"
import { ItemData } from "../../page"
import styles from './itemCard.module.scss'
import { useState } from "react"
import Image from "next/image"

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL


const ItemCard = ({product, item}:{product:Product, item:ItemData}) => {

  const [itemQuantity, setItemQuantity] = useState(item.item_quantity)

  const increaseItemQuantity = () => {
      const newQuantity = itemQuantity + 1
      setItemQuantity(newQuantity)
  }

  const decreseItemQuantity = () => {
    const newQuantity = itemQuantity - 1
    setItemQuantity(newQuantity)
  }

  return (
    <div className={styles.card}>
      <div className={styles.productView}>
        <Image 
          src={`${environment === 'production'?prodUrl:devUrl}/${product.photos[0]}`}
          height={50}
          width={50}
          alt="product photo"
        />
        <div className={styles.nameAndCost}>
           <h6>{product.name}</h6>
           <p>KES. {product.cost}</p>
        </div>
        
      </div>  
      <div className={styles.counterContainer}>
        <button onClick={decreseItemQuantity}>-</button>
        <div className={styles.itemQuantity}>{itemQuantity}</div>
        <button onClick={increaseItemQuantity}>+</button>
      </div>
    </div>
  )
}
export default ItemCard