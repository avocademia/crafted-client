import { addCartItem, verifyCartItem } from "../../../../api/User"
import { loadUserData } from "../../../../Helpers"
import { Product } from "../../../../Types"
import { useEffect, useState } from "react"
import styles from './productCard.module.scss'
import Image from "next/image"
import Link from "next/link"

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL



const ProductCard = ({product}:{product:Product}) => {

  const [isCartItem, setCartItemStatus] = useState(false)

  useEffect(() => {
    const user = loadUserData()
    if (user && user.id) {
      verifyCartItem(product.id, product.type).then (available => {
        if (available === true) {
          setCartItemStatus(true)
        }
      })
    };

  }, [product.id, product.type])

  const handleAddToCart = () => {
    const itemData = {
      product_id: product.id,
      product_type: product.type,
      product_name: product.name,
      quantity: product.quantity,
      cost: product.cost
    }

    addCartItem(itemData)
    setCartItemStatus(true)
  }

  

  return (
    <article className={styles.card}>
        <div className={styles.productView}>
          <Image 
            src={`${environment=== 'production'? prodUrl:devUrl}/${product.photos[0]}`} 
            alt="product photo" 
            height={180} 
            width={180}
            className={styles.image}
          />
          <h5>{product.name}</h5>
          <p>KES. {product.cost}</p>
        </div>
        <div className={styles.productActions}>
          <Link href={`/shop/${product.id}?type=${product.type}`}>
            <button>view</button>
          </Link>
          {!isCartItem &&
            <button onClick={handleAddToCart}>{product.type ==='custom'?'order':'purchase'}</button>
          }
        </div>
    </article>
  )
}
export default ProductCard