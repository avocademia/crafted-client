'use client'

import { useEffect, useState } from "react"
import { populateShop } from "../../api/Public"
import { Product } from "../../Types"
import SearchBar from "./components/seach bar/SearchBar"
import ProductDisplay from "./components/product display/ProductDisplay"

const Shop = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
      populateShop().then (json =>{
        setProducts(json)
        return json
      }).then (json => {
        setSearchResults(json)
      })
  }, [])

  return (
    <main>
      <SearchBar products={products} setSearchResults={setSearchResults}/>
      <ProductDisplay searchResults={searchResults}/>
    </main>
  )
}
export default Shop