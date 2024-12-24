'use client'

import ManageKlosetNav from "../../../../components/navbars/ManageKlosetNav"
import { fetchSingleProduct } from "../../../../api/Admin"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState, useRef} from "react"
import { KlosetType, Product } from "../../../../Types"
import { ToastContainer } from "react-toastify"
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules'
import { usePathname } from "next/navigation"
import styles from './editProduct.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-coverflow'

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

const EditProductPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const {subSlug} = params
  const type = searchParams.get('type') as KlosetType
  const [product, setProduct] = useState<Product>()
  const [activeInput, setInput] = useState('')
  const swiperRef = useRef<SwiperClass>()
  const hideSettingsButton = type !== null

  if (type && typeof subSlug === 'string') {

    const queryParams = {type: type, product_id: parseInt(subSlug)}

    useEffect(() => {
      fetchSingleProduct(queryParams).then(product => {
        setProduct(product)
      })
    }, [])   
  }

  const handlePhotoDeletion = () => {
    const isConfirmed = window.confirm('Are you sure you want todelete this photo')

    if (isConfirmed) {
      console.log('deleted')
    }
  }

  if (product === undefined) {
    return <main>Product not found</main>
  }

  return (
    <>
      <ManageKlosetNav hideSettingsButton={hideSettingsButton} slug={subSlug}/>
      <main className={styles.main}>
        <section className={styles.view}>
          <article className={styles.photos}>
            <div className={styles.photosNav}>
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
                    <div className={styles.photoDeleteBtnWrapper}>
                      <button 
                        onClick={(e) => {
                          handlePhotoDeletion();
                        }}
                        className={styles.photoDeleteBtn}
                      >
                        <Icon 
                          icon="hugeicons:delete-04" 
                          width={24} 
                          height={24} 
                          color="#f0f0f0"
                        />
                      </button>
                    </div>
                    
                  
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
          </article>
          <article className={styles.details}>
            <h1>Product Details</h1>
            <div className={styles.edit}>
              <div className={styles.field}>
                {activeInput !== 'name' &&
                  <>
                    <span>{product.name}</span>
                    <button onClick={() => setInput('name')}>
                      <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                    </button>
                  </>
                }
                {activeInput === 'name' && 
                  <form>
                    <input type="text" className={styles.input}/>
                    <button>   
                      <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                    </button>
                  </form>
                }
              </div>
              { type === 'books' &&
                <div className={styles.field}>
                  {activeInput !== 'author' &&
                    <>
                      <span>{product.author}</span>
                      <button onClick={() => setInput('author')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'author' && 
                    <form>
                      <input type="text" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              <div className={styles.field}>
                  {activeInput !== 'cost' &&
                    <>
                      <span>KES. {product.cost}</span>
                      <button onClick={() => setInput('cost')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'cost' && 
                    <form>
                      <input type="number" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
              </div>
              { (type === 'retail' || type === 'books') &&
                <div className={styles.field}>
                  {activeInput !== 'quantity' &&
                    <>
                      <span>quantity: {product.quantity}</span>
                      <button onClick={() => setInput('quantity')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'quantity' && 
                    <form>
                      <input type="number" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              { (type === 'digital' || type === 'custom' || type === 'retail') &&
                <div className={styles.field}>
                  {activeInput !== 'description' &&
                    <>
                      <span>{product.description}</span>
                      <button onClick={() => setInput('description')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'description' && 
                    <form>
                      <input type="textarea" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              { type === 'books' &&
                <div className={styles.field}>
                  {activeInput !== 'summary' &&
                    <>
                      <span>{product.summary}</span>
                      <button onClick={() => setInput('summary')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'summary' && 
                    <form>
                      <input type="textarea" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              { (type === 'retail' || type === 'custom') &&
                <div className={styles.field}>
                  {activeInput !== 'category' &&
                    <>
                      <span>category: {product.category}</span>
                      <button onClick={() => setInput('category')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'category' && 
                    <form>
                      <input type="text" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              { (type === 'retail' || type === 'custom') &&
                <div className={styles.field}>
                  {activeInput !== 'sub-category' &&
                    <>
                      <span>sub category: {product.sub_category}</span>
                      <button onClick={() => setInput('sub-category')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'sub-category' && 
                    <form>
                      <input type="text" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              { type === 'custom' &&
                <div className={styles.field}>
                  {activeInput !== 'production-time' && 
                    <>
                      <span>production time: {product.production_time} hrs</span>
                      <button onClick={() => setInput('production-time')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'production-time' &&
                    <form>
                      <input type="number" className={styles.input}/>
                      <button>   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              {type === 'digital' && 
                <form>
                  <input type="file" />
                  <button>   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>
            <div className={styles.buttons}>
              <div className={styles.visibility}>
                { (type === 'custom' || type === 'digital') && product.active === true && 
                  <button>hide</button>
                }
                { (type === 'custom' || type === 'digital') && product.active === false && 
                    <button>launch</button>
                }
              </div>
              <button className={styles.delete}>   
                  <Icon icon="hugeicons:delete-03" width={35} height={35} color='#3b0000'/>
              </button>
            </div>
          </article>  
        </section>   
      </main>
    </>
  )
}
export default EditProductPage