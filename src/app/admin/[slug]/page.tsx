'use client'

import ManageKlosetNav from "../../../components/navbars/ManageKlosetNav"
import Link from "next/link"
import { useParams,} from "next/navigation"
import styles from './manageKlosets.module.scss'
import { useState, useEffect,} from "react"
import { Icon } from "@iconify/react"
import { fetchProductsByKloset, fetchSingleKloset } from "../../../api/Admin"
import ProductCard from "./components/product card/ProductCard"
import { KlosetType, Product } from "../../../Types"

const manageKloset = () => {
  const params = useParams()
  const {slug} = params
  const [productList, setProducts] = useState<Product[]>([])
  const [type, setType] = useState<KlosetType>('retail')
  
  if (typeof slug === 'string') {
    useEffect(() => { 

      const fetchProducts = async (type:KlosetType) => {
        const products = await fetchProductsByKloset(parseInt(slug),type)
        setProducts(products)
      }

      const fetchKloset = async () => {
        const data = await fetchSingleKloset(parseInt(slug))
        if (data) {
          setType(data[0].type)
          fetchProducts(data[0].type)
        }
      }
      fetchKloset()
    
    },[])
  }

  return (
    <main className={styles.main}>
        <ManageKlosetNav slug={slug} hideSettingsButton={false}/>
        <section className={styles.productsSection}>
          <article className={styles.topProductSection} >
            <h1>Products</h1>
            <Link href={`${slug}/add-product`}>
              <Icon  icon="noto-v1:plus" height={30} width={30} className={styles.addKlosetIcon}/>
            </Link>
          </article>
          <article>
            {
              productList.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  type={type} 
                  slug={typeof slug === 'string'? slug : ''}
                />
              ))
            }
          </article>
        </section>
    </main>
  )
}
export default manageKloset