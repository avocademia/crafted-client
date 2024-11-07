'use client'

import ManageKlosetNav from "@/components/navbars/ManageKlosetNav"
import { usePathname, useParams } from "next/navigation"
import styles from './klosetSettings.module.css'
import { useState, useEffect } from "react"
import { fetchSingleKloset } from "@/api/Admin"

const klosetSettings = () => {
  const [kloset,setKloset] = useState()
  const pathname = usePathname()
  const params = useParams()
  const {slug} = params
  const hideSettingsButton = pathname?.includes('/settings')

  useEffect (() => {
    const fetchKloset = async () => {
      const data = await fetchSingleKloset(slug)
      setKloset(data)
      console.log('data:', data)
    }
    fetchKloset()
  })

  return (
    <main className={styles.main} >
      <ManageKlosetNav hideSettingsButton={hideSettingsButton} />
      <section className={styles.mainSection}>
        <h1>settings</h1>
      </section>
    </main>
  )
}
export default klosetSettings