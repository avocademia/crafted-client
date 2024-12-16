'use client'

import { useParams, useSearchParams } from "next/navigation"
import { Category, KlosetData, KlosetType, Product } from "../../../Types"
import { useEffect, useState, useRef} from "react"
import { populateKlosetPage, populateProductPage } from "../../../api/Public"
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import ProductPageNav from "../../../components/navbars/ProductPageNav"
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules'
import Image from "next/image"
import { Icon } from '@iconify/react'
import styles from './productPage.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-coverflow'
import { generateKey } from "crypto"

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

const page = () => {
  const params = useParams()
  const { slug } = params
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as KlosetType
  const [product, setProduct] = useState<Product>()
  const [kloset, setKloset] = useState<KlosetData>()
  const [category, setCategory] = useState<Category>()
  const swiperRef = useRef<SwiperClass>()

  useEffect(() => {
    if (typeof slug === 'string') {

      populateProductPage(parseInt(slug), type).then(product => {

        setProduct(product)
        return product

      }).then(product => {

        const actualProduct = product as Product

        if (actualProduct.type === 'digital' || actualProduct.type==='books') {
          setCategory(actualProduct.type)
        } else {
          setCategory(actualProduct.category)
        }

        populateKlosetPage(actualProduct.kloset_id).then(kloset => {
          setKloset(kloset)
        })
      })
    }
  }, [])

  return (
    <>
      <ProductPageNav/>
      <main className={styles.main}>
        <section className={styles.view}>
          <article className={styles.firstView}>
            <div className={styles.photoWrapper}>
              <div className={styles.navWrapper}>
                <div
                  className={`${styles.navButton} ${styles.prev}`}
                  aria-label="Previous"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <Icon icon="mdi:chevron-left" className={styles.navIcon} />
                </div>
                <div
                  className={`${styles.navButton} ${styles.next}`}
                  aria-label="Next"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <Icon icon="mdi:chevron-right" className={styles.navIcon} />
                </div>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
                spaceBetween={10}
                slidesPerView="auto"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 50,
                  modifier: 2.5,
                  slideShadows: true,
                }}
                pagination={{ clickable: true }}
                centeredSlides={true}
              >
                {product?.photos.map((photo, index) => (
                  <SwiperSlide key={index} className={styles.slide}>
                    <Image
                      src={`${environment === 'production' ? prodUrl : devUrl}/${photo}`}
                      alt="product photo"
                      height={180}
                      width={180}
                      className={styles.productImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.overview}>
              <h1>{product?.name}</h1>
              {!(product?.type === 'books') && 
                <p>{category}{product?.sub_category && `/${product.sub_category}`}</p>
              }
              {product?.type === 'books' && 
                product?.genre?.map(genre => <button>{genre}</button>)
              }
              <h6>KES. {product?.cost}</h6>
            </div>
          </article>
          <article className={styles.secondView}>

            <div className={styles.details}>
              <p>
                Illuminate your evenings with the eco-friendly Solar-Powered Outdoor Lantern, 
                the perfect blend of elegance, durability, and sustainability. 
                Whether you're hosting a backyard gathering, enjoying a quiet evening 
                on your patio, or embarking on a camping adventure, this lantern adds 
                a warm and welcoming glow to any setting.

                Crafted from weather-resistant materials, this lantern is built to withstand 
                the elements, ensuring reliable performance year-round. 
                Its sleek, modern design effortlessly complements various 
                outdoor aesthetics, from rustic gardens to contemporary patios.

                What sets this lantern apart is its powerful solar charging capabilities. 
                Equipped with high-efficiency solar panels, it charges during the day and 
                provides up to 10 hours of soft, ambient light after sunset. No need for 
                batteries or electricity—just clean, renewable energy at your fingertips.

                The Solar-Powered Outdoor Lantern is incredibly easy to use, featuring an 
                automatic on/off sensor that activates at dusk and turns off at dawn. Plus, 
                its lightweight and portable design make it convenient to place anywhere, 
                whether hanging from a hook, sitting on a table, or lining a walkway.

                Upgrade your outdoor experience with this versatile lighting solution. 
                Eco-conscious, stylish, and practical, the Solar-Powered Outdoor Lantern 
                is more than just a light—it's an investment in sustainable living and 
                nforgettable moments under the stars.
              </p>
            </div>
            <div className={styles.actions}>
                <button>buy now</button>
                <button>add to cart</button>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}

export default page
