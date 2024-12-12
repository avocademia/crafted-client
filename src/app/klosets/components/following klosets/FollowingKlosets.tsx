import { useState } from "react"
import { KlosetData } from "../../../../Types"
import SearchBar from "../search bar/SearchBar"
import KlosetDisplay from "../kloset display/KlosetDisplay"

const FollowingKlosets = ({followedKlosets}:{followedKlosets:KlosetData[]}) => {

    const [results,setResults] = useState(followedKlosets)

    return (
        <div>
            <SearchBar setSearchResults={setResults} klosets={followedKlosets}/>
            <KlosetDisplay results={results}/>
        </div>
    )
}
export default FollowingKlosets