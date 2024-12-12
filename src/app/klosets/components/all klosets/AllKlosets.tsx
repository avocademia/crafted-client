'use client'

import { KlosetData } from "../../../../Types"
import KlosetDisplay from "../kloset display/KlosetDisplay"
import SearchBar from "../search bar/SearchBar"
import { useState } from "react"

const AllKlosets = ({klosets}:{klosets:KlosetData[]}) => {
    const [results, setResults] = useState(klosets)
  return (
    <div>
        <SearchBar setSearchResults={setResults} klosets={klosets}/>
        <KlosetDisplay results={results}/>
    </div>
  )
}
export default AllKlosets