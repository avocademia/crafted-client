import HomeNavbar from "../components/navbars/HomeNavbar"
import Link from "next/link"
import Image from "next/image"
import styles from './home.module.scss'

const Home = () => {
  return (
    <main className={styles.container}>
      <HomeNavbar/>
      <article className={styles.hero}>
          <Link href='/shop' className={styles.heroLink}>
            <div className={styles.wrapper}>
              <div className={styles.overlay}/>
              <Image src='/shop.jpg' width={300} height={300} className={styles.image} alt="shop"/>  
              <p className={styles.heroText}>shop</p>
            </div>
          </Link>
          <Link href='/klosets' className={styles.heroLink}>
            <div className={styles.wrapper}>
              <div className={styles.overlay}/>
              <Image src='/closets.jpg' width={300} height={300} className={styles.image} alt="closets"/> 
              <p className={styles.heroText}>closets</p>
            </div>
          </Link>
      </article>
    </main>
  )
}
export default Home