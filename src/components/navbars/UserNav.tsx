import styles from './navbar.module.scss'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const UserNav = () => {

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
        <Link className={styles.navContainers} href='/'>
          <Icon icon="material-symbols-light:home" className={styles.icon}/>
        </Link>
        <Link className={styles.navContainers} href='/user/cart'>
          <Icon icon="solar:cart-bold" className={styles.icon}/>
        </Link>
    </section>
  )
}
export default UserNav