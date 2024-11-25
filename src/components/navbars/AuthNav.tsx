import styles from './navbar.module.css'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'

const AuthNav = () => {
  return (
    <section className={styles.container}>
        <Link className={styles.navContainers} href='/'>
          <Image src='/logo.png' width={130} height={70} alt='logo'/>
        </Link>
        <Link className={styles.navContainers} href='/'>
          
        </Link>
        <Link className={styles.navContainers} href='/'>
          <Icon icon="material-symbols-light:home" className={styles.icon}/>
        </Link>
    </section>
  )
}
export default AuthNav