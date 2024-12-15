import Image from "next/image"
import { KlosetType, Product } from "../../../../../Types"
import styles from './productCard.module.scss'
import Link from "next/link"

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

interface ProductCardProps {
    product: Product,
    type: KlosetType,
    slug: string
}

const ProductCard = ({product, type, slug}: ProductCardProps) => {

  return (
    <div className={styles.card}>
      <div className={styles.view}>
        <Image 
          src={`${environment === 'production'?prodUrl:devUrl}/${product.photos[0]}`} 
          height={50} 
          width={50}
          alt="product photo"
          className={styles.image}
        />
        <div className={styles.text}>
          <h5>{product.name}</h5>
          {(type === 'retail' || type === 'books') &&
            <p>{product.quantity} units left</p>
          }
          {(type === 'custom' || type === 'digital') &&
            <p>{product.active?'active':'hidden'}</p>

          }
        </div>
      </div>
      <div className={styles.actions}>
        {(type === 'custom' || type === 'digital') &&
          <button>{product.active? 'hide':'launch'}</button>
        }
        <Link href={`${slug}/${product.id}?type=${type}`} className={styles.link}>
          <button>edit</button>
        </Link>
      </div>
    </div>
  )
}
export default ProductCard