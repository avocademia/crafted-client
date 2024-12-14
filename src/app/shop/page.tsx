'use client'

import { useEffect, useState } from "react"
import { populateShop } from "../../api/Public"
import { Product } from "../../Types"
import SearchBar from "./components/seach bar/SearchBar"
import ProductDisplay from "./components/product display/ProductDisplay"
import ShopNav from "../../components/navbars/ShopNav"
import styles from './shop.module.scss'

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
    <>
      <ShopNav/>
      <SearchBar products={products} setSearchResults={setSearchResults}/>
      <main className={styles.main}>
        <ProductDisplay searchResults={searchResults}/>
      </main>
    </>
  )
}
export default Shop