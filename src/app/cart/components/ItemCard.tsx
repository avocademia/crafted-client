import { Product } from "../../../Types"



const ItemCard = ({product}:{product:Product}) => {
  return (
    <div>
        <h6>{product.name}</h6>
    </div>
  )
}
export default ItemCard