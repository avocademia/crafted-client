import styles from './navbar.module.scss'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter} from 'next/navigation'



const KroductPageNav = () => {
  const router = useRouter()

  const [isMobile, setIsMobile] = useState(false)

    useEffect (() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768 )
        }

        window.addEventListener('resize' , handleResize)
        handleResize()

        return window.removeEventListener('resize' , handleResize)
    }, [])

  
  
  return (
    <section className={styles.container}>
        <button className={styles.navContainers} onClick={() => router.back()} >
          <Icon icon="icon-park-solid:back" className={styles.icon} color='#fff'/>
        </button>
        <Link className={styles.navContainers} href={`/cart`}>
          <Icon icon="solar:bag-outline" className={styles.icon} color='#fff'/>
        </Link>
    </section>
  )
}
export default KroductPageNav