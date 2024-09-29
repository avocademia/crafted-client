import styles from './navbar.module.css'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const UserNav = () => {
  return (
    <section className={styles.container}>
        <Link className={styles.navContainers} href='/'>
          <Image src='/logo.png' width={130} height={70} alt='logo'/>
        </Link>
        <Link className={styles.navContainers} href='/'>
          <Icon icon="mdi:web" className={styles.icon}/>
        </Link>
        <Link className={styles.navContainers} href='/user/cart'>
          <Icon icon="solar:cart-bold" className={styles.icon}/>
        </Link>
    </section>
  )
}
export default UserNav