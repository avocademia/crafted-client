import Image from 'next/image'
import styles from './KlosetCard.module.scss'
import dotenv from 'dotenv'
import { Kloset } from '../../../../Types'

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

dotenv.config()
interface KlosetCardProps {
  kloset: Kloset
}

const KlosetCard = ({kloset}: KlosetCardProps) => {
  const {name, type, followers, dp} = kloset
  return (
    <div className={styles.card}>
        <div className={styles.imageContainer}>
            <Image 
              alt='display_picture' 
              src={`${environment === 'production'?prodUrl:devUrl}/${dp}`} 
              height={80} width={80} 
              className={styles.image}
            />
        </div>
        <div className={styles.textContainer}>
            <h3>{name}</h3>
            <div>{type}</div>
            <span>{followers.length} followers</span>
        </div>
    </div>
  )
}
export default KlosetCard