import Image from 'next/image'
import styles from './KlosetCard.module.scss'
import dotenv from 'dotenv'
import { Kloset } from '../../../../Types'

dotenv.config()
interface KlosetCardProps {
  kloset: Kloset
}

const KlosetCard = ({kloset}: KlosetCardProps) => {
  const {name, type, followers, dp} = kloset
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL
  //{`${serverURL}/${dp}`}

  return (
    <div className={styles.card}>
        <div className={styles.imageContainer}>
            <Image alt='display_picture' src='/user.png' height={80} width={80} className={styles.image}/>
        </div>
        <div className={styles.textContainer}>
            <h3>{name}</h3>
            <div>{type}</div>
            <span>{followers.length} Followers</span>
        </div>
    </div>
  )
}
export default KlosetCard