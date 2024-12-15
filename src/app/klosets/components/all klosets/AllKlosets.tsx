'use client'

import { KlosetData } from "../../../../Types"
import KlosetDisplay from "../kloset display/KlosetDisplay"
import SearchBar from "../search bar/SearchBar"
import { useState } from "react"
import styles from './allKlosets.module.scss'

const AllKlosets = ({klosets}:{klosets:KlosetData[]}) => {
    const [results, setResults] = useState(klosets)
  return (
    <>
      <SearchBar setSearchResults={setResults} klosets={klosets}/>
      <section className={styles.display}>
        <KlosetDisplay results={results}/>
      </section> 
    </>  
  )
}
export default AllKlosets