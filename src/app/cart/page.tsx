'use client'

import { useEffect, useState } from "react"
import { populateCart } from "../../api/User"
import { Product, KlosetType } from "../../Types"
import { populateShop } from "../../api/Public"
import ItemDisplay from "./components/item display/ItemDisplay"
import styles from './cart.module.scss'
import CartNav from "../../components/navbars/CartNav"

export type ItemData = {
  user_id: number,
  product_id: number,
  product_name: string,
  item_quantity: number,
  quantity?: number,
  sold_out: boolean,
  active_status: boolean,
  cost: number,
  product_type: KlosetType,
}

const page = () => {

    const [items, setCartItems] = useState<ItemData[]>([])
    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=> {

        populateCart().then(items  => {

            const actualItems = items as ItemData[]
            const itemFilters = actualItems.map(item => {
                return { 
                    product_id: item.product_id, 
                    product_type: item.product_type
                }
            })

            const filteredItems = actualItems.filter(item => itemFilters.some( filter =>
                item.product_id === filter.product_id &&
                item.product_type === filter.product_type
            ))
            setCartItems(filteredItems)

            populateShop().then(products => {
                const Products = products as Product[]
                const filteredProducts = Products.filter(product => itemFilters.some( filter =>
                    product.type === filter.product_type && 
                    product.id === filter.product_id
                ))
                setProducts(filteredProducts)
            })
        })
    },[])

    return (
      <main className={styles.main}>
        <CartNav/>
        <ItemDisplay products={products} items={items}/>
      </main>
    )
}

export default page