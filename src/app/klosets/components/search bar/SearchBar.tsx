import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { KlosetData } from "../../../../Types"
import styles from './searchBar.module.scss'

interface SearchBarProps {
    klosets: KlosetData[],
    setSearchResults: Function
}

const SearchBar = ({ klosets, setSearchResults }: SearchBarProps) => {

    const [loading,setLoading]= useState(true)    
    useEffect(() => {
        setSearchResults(klosets)
        setLoading(false)
    }, [klosets, setSearchResults]) 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
    
    const handleSearchResults = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return setSearchResults(klosets)

        const searchValue = e.target.value.toLowerCase()
        
        const resultsArray = klosets.filter(kloset => 
            kloset.name.toLowerCase().includes(searchValue) ||
            kloset.slogan.toLowerCase().includes(searchValue) ||
            kloset.category.toLowerCase().includes(searchValue) ||
            kloset.type.toLowerCase().includes(searchValue)
        )

        setSearchResults(resultsArray)
    }

    if (loading) return <div>Loading...</div>

    return (
        <article className={styles.searchBar}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    type="text" 
                    onChange={handleSearchResults} 
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchBtn}>
                    <Icon icon="mingcute:search-line" />
                </button>
            </form>
        </article>
    )
}

export default SearchBar
