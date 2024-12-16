import styles from './navbar.module.scss'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter} from 'next/navigation'


const ProductPageNav = () => {
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
        {!isMobile && 
         <Link className={styles.navContainers} href='/'>
          <Image src='/logo.png' width={130} height={70} alt='logo'/>
         </Link>
        }
        <button className={styles.navContainers} onClick={() => router.back()} >
          <Icon icon="icon-park-solid:back" className={styles.icon}/>
        </button>
        <Link className={styles.navContainers} href={`/cart`}>
          <Icon icon="solar:bag-outline" className={styles.icon}/>
        </Link>
    </section>
  )
}
export default ProductPageNav