'use client'

import { useEffect, useState } from "react"
import { populateCart } from "../../api/User"
import { Product, KlosetType } from "../../Types"
import { populateShop } from "../../api/Public"
import ItemDisplay from "./components/itemDisplay"

export type ItemData = {
  user_id: number,
  product_id: number,
  product_name: string,
  photo_path: string,
  quantity?: number,
  sold_out: boolean,
  active_status: boolean,
  cost: number,
  product_type: KlosetType,
}

const page = () => {

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
      <main>
        <ItemDisplay products={products}/>
      </main>
    )
}

export default page