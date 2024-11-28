import styles from './navbar.module.scss'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter} from 'next/navigation'

interface klosetNav {
  slug: string|string[],
  hideSettingsButton: boolean
}

const ManageKlosetNav: React.FC<klosetNav> = ({slug, hideSettingsButton}) => {
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
        {!hideSettingsButton && 
          <Link className={styles.navContainers} href={`/admin/${slug}/settings`}>
            <Icon icon="ic:sharp-settings" className={styles.icon}/>
          </Link>
        }
    </section>
  )
}
export default ManageKlosetNav