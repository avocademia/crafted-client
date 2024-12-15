'use client'

import { useEffect, useState } from 'react'
import styles from './admin.module.scss'
import AdminNav from '../../components/navbars/AdminNav'
import KlosetCard from './components/kloset card/KlosetCard'
import UserCard from './components/user card/UserCard'
import { Icon } from '@iconify/react'
import KlosetDisplay from './components/kloset display/KlosetDisplay'
import { fetchKlosets, fetchUsers, verifyFirstAdmin } from '../../api/Admin'
import { Kloset, UserData } from '../../Types'
import UsersDisplay from './components/users display/UsersDisplay'

interface Display {
  label: string,
  icon: string,
  content: JSX.Element
}

const admin = () => {

    const [isMobile, setIsMobile] = useState(false)
    const [activeSection, setActiveSection] = useState<keyof typeof displays>('overview')
    const [isFirstAdmin, setFirstAdmin] = useState(false)
    const [users, setUsers] = useState<UserData[]>([])
    const [klosets, setKlosets] = useState<Kloset[]>([])

    useEffect (() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000 )
        }
        window.addEventListener('resize' , handleResize)
        handleResize()

        const checkFirstAdmin = async () => {
          const firstAdmin = await verifyFirstAdmin()
          if (firstAdmin === true) {
              setFirstAdmin(firstAdmin)
          }
        }
        checkFirstAdmin()

        return window.removeEventListener('resize' , handleResize)   
    }, [])

    const displays: Record<string, Display> = {
        overview: {
          label: 'Overview',
          icon: "material-symbols:dashboard",
          content: <div>Overview Section</div>,
        },
        klosets: {
          label: 'Klosets',
          icon: "mdi:hanger",
          content: <KlosetDisplay klosets={klosets}/>,
        },
        orders: {
          label: 'Orders',
          icon: "material-symbols:orders-outline",
          content: 
            <div>Orders Section</div>,
        },
        stats: {
          label: 'Stats',
          icon: "material-symbols:query-stats-rounded",
          content: <div>Stats Section</div>,
        },
        account: {
          label: 'Account',
          icon: "lucide:hand-coins",
          content: <div>Account Section</div>,
        },
        ...(isFirstAdmin ? {
          users: {
              label: 'Users',
              icon: "mdi:user" ,
              content: <UsersDisplay users={users}/>,
          }
        }: {}),
    }

    const displayUsers = async () => {
      const data = await fetchUsers()
      setUsers(data)
    }

    const displayKlosets = async () => {
      const data = await fetchKlosets()
      setKlosets(data)
    }

    const handleActiveSection = (key:keyof typeof displays) => {
      setActiveSection(key)
      if (key === 'users') {
        displayUsers()
      }

      if (key === 'klosets') {
        displayKlosets()
      }
    }

  return (
    <>
      <AdminNav/>
      <main className={styles.main}>
        <section className={styles.mainSection }>
          {!isMobile && 
            <article className={styles.navigation}>
              {Object.keys(displays).map((key) => (
                  <button key={key} onClick={() => handleActiveSection(key)} className={activeSection === key ? styles.activeNav : ''}>{displays[key].label}</button>
              ))}
            </article>
          }
            <article className={styles.display}>
                {displays[activeSection].content}
            </article>
        </section>
        {isMobile && 
        <section className={styles.mobileNavigation}>
            {Object.keys(displays).map((key) => (
              <div key={key} onClick={() => handleActiveSection(key)} className={`${styles.navButton}  ${activeSection === key ? styles.activeDiv : ''}`}>
                <Icon  key={key} icon={displays[key].icon} className={ `${styles.navIcons} ${activeSection === key ? styles.activeIcon : ''}`} height={28} width={28}/>
              </div>
            ))}
        </section>}
      </main>
    </>
  )
}
export default admin