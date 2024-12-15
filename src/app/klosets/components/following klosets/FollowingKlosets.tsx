import { useState } from "react"
import { KlosetData } from "../../../../Types"
import SearchBar from "../search bar/SearchBar"
import KlosetDisplay from "../kloset display/KlosetDisplay"
import styles from './followingKlosets.module.scss'

const FollowingKlosets = ({followedKlosets}:{followedKlosets:KlosetData[]}) => {

    const [results,setResults] = useState(followedKlosets)

    return (
        <>
            <SearchBar setSearchResults={setResults} klosets={followedKlosets}/>
            <section className={styles.display}>
                <KlosetDisplay results={results}/>
            </section>
        </>
    )
}
export default FollowingKlosets