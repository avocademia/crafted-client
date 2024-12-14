import { addCartItem, verifyCartItem } from "../../../../api/User"
import { loadUserData } from "../../../../Helpers"
import { Product } from "../../../../Types"
import { useEffect, useState } from "react"


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
    }
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
    <div>
        <h3>{product.name}</h3>
        <div>
          <button>view</button>
          {!isCartItem &&
            <button onClick={handleAddToCart}>{product.type ==='custom'?'order':'purchase'}</button>
          }
        </div>
    </div>
  )
}
export default ProductCard