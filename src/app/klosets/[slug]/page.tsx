'use client'

import { useEffect, useState } from 'react'
import styles from './klosetPage.module.scss'
import { KlosetData, Product } from '../../../Types'
import { populateKloset } from '../../../api/Public'
import { useParams } from 'next/navigation'
import ProductPageNav from '../../../components/navbars/ProductPageNav'
import Image from 'next/image'
import SearchBar from '../../shop/components/seach bar/SearchBar'
import ProductDisplay from './components/ProductDisplay'
import { Icon } from '@iconify/react'
import KlosetPageNav from '../../../components/navbars/KlosetPageNav'

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

const page = () => {

  const [kloset, setKloset] = useState<KlosetData>()
  const [products, setProducts] = useState<Product[]>([])
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [following, setFollowing] = useState(false)
  const [slogan, setSlogan] = useState('')
  const {slug} = useParams()

  useEffect(() => {

    if (typeof slug === 'string')
      populateKloset(parseInt(slug)).then(data => {
      setKloset(data.kloset)
      setSearchResults(data.products)
      setProducts(data.products)
      const actualText = () => {
        const textarea = document.createElement('textarea')
        textarea.innerHTML = data.kloset.slogan
        setSlogan(textarea.value)
      }
      actualText()
    })
      
  }, [])

  return (
    <>
      <KlosetPageNav/>
      <main className={styles.main}>
        <section className={styles.profile}>
          <Image 
            src={'/banner.jpg'}
            alt='Kloset Banner'
            width={400}
            height={250}
            className={styles.banner}
          />
          <div className={styles.screen}></div>
          <h1>{kloset?.name}</h1>
          <h6>{slogan}</h6>
        </section>
        <section className={styles.details}>
            <Image 
                src={'/user.png'}
                alt='Kloset Logo'
                width={80}
                height={80}
                className={styles.logo}
            />

            <div className={styles.pin}>
              <div className={following === false? styles.pinButton : styles.pinButtonActive}>
                <Icon 
                  icon="solar:pin-broken"
                  height={30} 
                  width={30} 
                  color={following === true? '#f0f0f0' : '#002d00'}
                />
              </div>
              <p>{kloset?.followers?.length} pins</p>
            </div>
            <div className={styles.contacts}>
              <a href="" className={styles.link}>
                <div className={styles.button}>
                  <Icon 
                    icon="solar:phone-bold" 
                    height={30} 
                    width={30} 
                    color='#002d00'
                  />
                </div>
              </a>
              <a href="" className={styles.link}>
                <div className={styles.button}>
                  <Icon 
                    icon="ic:sharp-whatsapp" 
                    width={30} 
                    height={30} 
                    color='#002d00'
                  />
                </div>
              </a>
              <a href="" className={styles.link}>
                <div className={styles.button}>
                  <Icon 
                    icon="line-md:email-filled" 
                    height={30} 
                    width={30} 
                    color='#002d00'
                  />
                </div>
              </a>
            </div>
            <div className={styles.stats}>
              <div className={styles.rating}>
                <Icon 
                  icon="solar:star-outline"
                  color='#f4da66'
                />
                <span>4.5k</span>
              </div>
              <p>4.2k sales</p>
            </div>
          </section>
        <section className={styles.shop}>
          <article className={styles.products}>
            <div className={styles.searchBarWrapper}>
              <SearchBar products={products} setSearchResults={setSearchResults}/>
            </div>
            <ProductDisplay searchResults={searchResults}/>
          </article>
        </section> 
      </main>
    </>
    
  )
}
export default page