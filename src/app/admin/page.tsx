'use client'

import { useEffect, useState } from 'react'
import styles from './admin.module.scss'
import AdminNav from '../../components/navbars/AdminNav'
import KlosetCard from './components/kloset card/KlosetCard'
import UserCard from './components/user card/UserCard'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { fetchKlosets, fetchUsers, verifyFirstAdmin } from '../../api/Admin'
import { Kloset, UserData } from '../../Types'

interface Displays {
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


    const displays: Record<string, Displays> = {
        overview: {
          label: 'Overview',
          icon: "material-symbols:dashboard",
          content: 
            <div className={styles.displayContainers}>
                Overview Section
            </div>,
        },
        klosets: {
          label: 'Klosets',
          icon: "mdi:hanger",
          content: 
            <div className={styles.displayContainers}>
                <div className={styles.addButtonContainer}>
                    <Link href='/admin/add-kloset'>
                        <Icon  icon="noto-v1:plus" height={30} width={30} className={styles.addKlosetIcon}/>
                    </Link>
                </div>
                <div>
                    { klosets.map((kloset,index) => 
                      (<Link key={index} href={`admin/${kloset.id}`}><KlosetCard kloset={kloset}/></Link>))
                    }
                </div>
            </div>,
        },
        orders: {
          label: 'Orders',
          icon: "material-symbols:orders-outline",
          content: 
            <div className={styles.displayContainers}>
                Orders Section
            </div>,
        },
        stats: {
          label: 'Stats',
          icon: "material-symbols:query-stats-rounded",
          content: 
            <div className={styles.displayContainers}>
                Stats Section
            </div>,
        },
        account: {
          label: 'Account',
          icon: "lucide:hand-coins",
          content: 
            <div className={styles.displayContainers}>
                Account Section
            </div>,
        },
        ...(isFirstAdmin ? {
          users: {
              label: 'Users',
              icon: "mdi:user" ,
              content: 
                  <div className={styles.displayContainers}>
                    {users.map((user, index) => 
                      (<UserCard 
                          key={index} 
                          username={user.username} 
                          whatsapp_number={user.whatsapp_number} 
                          role={user.role} 
                          id={user.id} 
                          first_name={user.first_name}
                          profile_picture={user.profile_picture}
                          authenticated={user.authenticated}
                      />))
                    }
                  </div>,
          }
          }: {}),
      }

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
    <main className={styles.main}>
      <ToastContainer/>
      <AdminNav/>
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
            <button key={key} onClick={() => handleActiveSection(key)} className={`${styles.navButton}  ${activeSection === key ? styles.active : ''}`}>
              <Icon icon={displays[key].icon} className={styles.navIcons}/>
            </button>
          ))}
       </section>}
    </main>
  )
}
export default admin