import { followKloset } from "../../../../api/User"
import { loadUserData } from "../../../../Helpers"
import { KlosetData } from "../../../../Types"
import { useState } from "react"
import styles from './klosetCard.module.scss'
import Image from "next/image"
import { Icon } from "@iconify/react"
import Link from "next/link"

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

const Klosetcard = ({kloset}:{kloset:KlosetData}) => {
  const user = loadUserData()
  const [localFollowers, setLocalFollowers] = useState(kloset.followers||[])

  const handleFollow = async () => {
    followKloset(kloset.id)
    const follower = user? user.id:''
    setLocalFollowers([...localFollowers, follower])
  }

  const isFollowing = user && localFollowers.includes(user.id)

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <Image 
          src={`${environment=== 'production'? prodUrl:devUrl}/${kloset.dp}`} 
          alt="kloset display picture"
          width={80}
          height={80}
          className={styles.image}
        />
        <div className={styles.text}>
          <h5>{kloset.name}</h5>
          <div className={styles.type}>
            <p>{kloset.type}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.actions}>
          {!isFollowing &&
            <button onClick={handleFollow}>Follow</button>
          }
          {isFollowing &&
            <p>Following</p>
          }
          <Link href={`/klosets/${kloset.id}`}>
            <button>view</button>
          </Link>
          
        </div>

        <div className={styles.details}>
          <div className={styles.imageDiv}>
            <Image
              src={'/user.png'}
              alt="founder profile picture"
              height={30}
              width={30}
              className={styles.image}
            />
          </div>
          <div className={styles.rating}>
            <Icon 
              icon="ic:outline-star" 
              className={styles.star}
            />
            <span>4.5</span>
          </div>
          <div className={styles.orders}>
            <p>1.2k</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export default Klosetcard