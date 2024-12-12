import { Product } from "../../../../Types"


const ProductCard = ({product}:{product:Product}) => {
  return (
    <div>
        <h3>{product.name}</h3>
    </div>
  )
}
export default ProductCard