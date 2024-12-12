import { Icon } from "@iconify/react"
import { KlosetData } from "../../../../Types"

interface SearchBarProps {
    klosets: KlosetData[],
    setSearchResults: Function
}

const SearchBar = ({klosets, setSearchResults}: SearchBarProps) => {

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => e.preventDefault()
    const handleSearchResults = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return setSearchResults(klosets)

        const searchValue = e.target.value.toLowerCase()
        
        const resultsArray = klosets.filter(kloset => 
            kloset.name.toLowerCase().includes(searchValue) ||
            kloset.slogan.toLowerCase().includes(e.target.value) ||
            kloset.category.toLowerCase().includes(e.target.value) ||
            kloset.type.toLowerCase().includes(e.target.value)
        )

        setSearchResults(resultsArray)
    }

    return (
        <article>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleSearchResults} />
                <button type="submit">
                    <Icon icon="mingcute:search-line"/>
                </button>
            </form>
        </article>
  )
}
export default SearchBar