import HomeNavbar from "../components/navbars/HomeNavbar"
import Link from "next/link"
import Image from "next/image"
import styles from './home.module.scss'
import { Icon } from "@iconify/react"

const Home = () => {
  return (
    <>
      <HomeNavbar/>
      <main className={styles.container}>
        <article className={styles.hero}>
            <Link href='/shop' className={styles.heroLink}>
              <div className={styles.wrapper}>
                <div className={styles.overlay}/>
                <Image src='/shop.jpg' width={300} height={300} className={styles.image} alt="shop"/>  
                <Icon icon="mdi:shop-outline" className={styles.icon}/>
              </div>
            </Link>
            <Link href='/klosets' className={styles.heroLink}>
              <div className={styles.wrapper}>
                <Icon icon="solar:closet-broken" className={styles.icon}/>
                <div className={styles.overlay}/>
                <Image src='/closets.jpg' width={300} height={300} className={styles.image} alt="closets"/> 
              </div>
            </Link>
        </article>
      </main>
    </>
    
  )
}
export default Home