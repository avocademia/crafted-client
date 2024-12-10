'use client'

import ManageKlosetNav from "../../../components/navbars/ManageKlosetNav"
import Link from "next/link"
import { useParams,} from "next/navigation"
import styles from './manageKlosets.module.scss'
import { useState, useEffect,} from "react"
import { Icon } from "@iconify/react"
import { fetchProductsByKloset, fetchSingleKloset } from "../../../api/Admin"
import RetailProductCard from "./components/RetailProductCard"
import CustomProductCard from "./components/CustomProductCard"
import DigitalProductCard from "./components/DigitalProductCard"
import BookCard from "./components/BookCard"
import { KlosetType, Product } from "../../../Types"

const manageKloset = () => {
  const params = useParams()
  const {slug} = params
  const [productList, setProducts] = useState<Product[]>([])
  const [type, setType] = useState<KlosetType>()
  
  if (typeof slug === 'string') {
    useEffect(() => { 

      const fetchProducts = async (type:KlosetType) => {
        const products = await fetchProductsByKloset(parseInt(slug),type)
        setProducts(products)
      }

      const fetchKloset = async () => {
        const data = await fetchSingleKloset(parseInt(slug))
        setType(data[0].type)
        fetchProducts(data[0].type)
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
            { type === 'retail' &&
                productList.map((product) => (
                  <Link href={`${slug}/${product.id}?type=${type}`}>
                    <RetailProductCard key={product.id} product={product}/>
                  </Link>
                ))
            }
            { type === 'custom' &&
                productList.map((product) => (
                  <Link href={`${slug}/${product.id}?type=${type}`}>
                    <CustomProductCard key={product.id} product={product}/>
                  </Link>
                ))
            }
            { type === 'digital' &&
                productList.map((product) => (
                  <Link href={`${slug}/${product.id}?type=${type}`}>
                    <DigitalProductCard key={product.id} product={product}/>
                  </Link>  
                ))
            }
            { type === 'books' &&
                productList.map((product) => (
                  <Link href={`${slug}/${product.id}?type=${type}`}>
                    <BookCard key={product.id} product={product}/>
                  </Link>
                ))
            }
          </article>
        </section>
    </main>
  )
}
export default manageKloset