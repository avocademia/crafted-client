'use client'

import ManageKlosetNav from "../../../../components/navbars/ManageKlosetNav"
import { usePathname, useParams } from "next/navigation"
import styles from './klosetSettings.module.scss'
import { useState, useEffect } from "react"
import { fetchSingleKloset } from "../../../../api/Admin"

const klosetSettings = () => {
  const [kloset,setKloset] = useState()
  const pathname = usePathname()
  const params = useParams()
  const {slug} = params
  const hideSettingsButton = pathname?.includes('/settings')

  if (typeof slug === 'string') {

    useEffect (() => {
      const fetchKloset = async () => {
        const data = await fetchSingleKloset(parseInt(slug))
        setKloset(data)
      }
      fetchKloset()
    }, [])

  }


  return (
    <main className={styles.main} >
      <ManageKlosetNav hideSettingsButton={hideSettingsButton} slug={slug} />
      <section className={styles.mainSection}>
        <h1>settings</h1>
      </section>
    </main>
  )
}
export default klosetSettings