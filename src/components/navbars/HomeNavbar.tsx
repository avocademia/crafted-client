"use client"

import styles from './navbar.module.scss'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HomeNavbar = () => {

  const [role, setRole] = useState<string|null>()

  useEffect (() => {
    const userRole = localStorage.getItem('role')
    setRole(userRole)
  })

  return (
    <section className={styles.container}>
        <Link className={styles.navContainers} href='/'>
          <Image src='/logo.png' width={130} height={70} alt='logo'/>
        </Link>
        {role === 'admin' && 
         <Link className={styles.navContainers} href='/admin'>
           <Icon icon="mdi:web" className={styles.icon}/>
         </Link>
         }
        <Link className={styles.navContainers} href='/user'>
          <Icon icon='material-symbols:user-attributes-rounded' className={styles.icon}/>
        </Link>
    </section>
  )
}
export default HomeNavbar