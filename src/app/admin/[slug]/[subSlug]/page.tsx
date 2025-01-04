'use client'

import ManageKlosetNav from "../../../../components/navbars/ManageKlosetNav"
import { addProductPhoto, deleteProductPhoto, editProduct, fetchSingleProduct } from "../../../../api/Admin"
import { useParams, useSearchParams } from "next/navigation"
import React, { useEffect, useState, useRef} from "react"
import { KlosetType } from "../../../../Types"
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules'
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
  const initialProduct = {
    id: -1,
    name: '',
    cost: 0,
    quantity: 0,
    category: '',
    sub_category: '',
    description: '',
    summary: '',
    author: '',
    genres: ['', ''],
    photos: ['', ''],
    path: '',
    production_time: 0,
    active: true
  }
  const params = useParams()
  const searchParams = useSearchParams()
  const {subSlug} = params
  const type = searchParams.get('type') as KlosetType
  const [activeInput, setInput] = useState('')
  const [value, setValue] = useState<string|number|boolean>('')
  const [id, setId] = useState(initialProduct.id)
  const [name, setName] = useState(initialProduct.name)
  const [author, setAuthor] = useState(initialProduct.author)
  const [cost, setCost] = useState(initialProduct.cost)
  const [summary, setSummary] = useState(initialProduct.summary)
  const [description, setDescription] = useState(initialProduct.description)
  const [quantity, setQuantity] = useState(initialProduct.quantity)
  const [production_time, setProductionTime] = useState(initialProduct.production_time)
  const [category, setCategory] = useState(initialProduct.category)
  const [sub_category, setSubCategory] = useState(initialProduct.sub_category)
  const [path, setPath] = useState(initialProduct.path)
  const [photos, setPhotos] = useState(initialProduct.photos)
  const [genre, setGenre] = useState(initialProduct.genres)
  const [active, setActive] = useState(initialProduct.active)
  const swiperRef = useRef<SwiperClass>()
  const [errors, setErrors] = useState()
  const [newPhotoError, setNewPhotoError] =useState('')
  const hideSettingsButton = type !== null

  const apparelSubcategories = [
    { value: 'tops', label: 'tops' },
    { value: 'bottoms', label: 'bottoms' },
    { value: 'dresses', label: 'dresses' },
    { value: 'underwear', label: 'underwear' },
    { value: 'outerwear', label: 'outerwear' },
    { value: 'units', label: 'units' },
  ]

  const jewellerySubcategories = [
    { value: 'necklaces', label: 'necklaces' },
    { value: 'bracelets', label: 'bracelets' },
    { value: 'earrings', label: 'earrings' },
    { value: 'rings', label: 'rings' },
    { value: 'anklets', label: 'anklets' },
    { value: 'watches', label: 'watches' },
    { value: 'body', label: 'body' },
  ]

  const decorSubcategories = [
    { value: 'paintings', label: 'paintings' },
    { value: 'wall art', label: 'wall art' },
    { value: 'glassware', label: 'glassware' },
    { value: 'ceramics', label: 'ceramics' },
    { value: 'wood work', label: 'wood work' },
    { value: 'lights', label: 'lights' },
    { value: 'furniture', label: 'furniture' },
    { value: 'rugs', label: 'rugs' },
    { value: 'other arts', label: 'other arts' },
  ]

  const shoesSubcategories = [
    { value: 'sneakers', label: 'sneakers' },
    { value: 'heels', label: 'heels' },
    { value: 'boots', label: 'boots' },
    { value: 'dress shoes', label: 'dress shoes' },
    { value: 'sandals', label: 'outerwear' },
    { value: 'other', label: 'other' },
  ]

  if (type && typeof subSlug === 'string') {

    const queryParams = {type: type, product_id: parseInt(subSlug)}

    useEffect(() => {
      fetchSingleProduct(queryParams).then(product => {
        setCost(product.cost)
        setQuantity(product.quantity)
        setProductionTime(product.production_time)
        setCategory(product.category)
        setSubCategory(product.sub_category)
        setPhotos(product.photos)
        setGenre(product.genres)
        setActive(product.active)
        setPath(product.path)
        setId(product.id)
        const actualText = () => {
          const Name = document.createElement('textarea')
          Name.innerHTML = product.name
          setName(Name.value)

          const Description = document.createElement('textarea')
          Description.innerHTML = product.description
          setDescription(Description.value)

          const Author = document.createElement('textarea')
          Author.innerHTML = product.author
          setAuthor(Author.value)

          const Summary = document.createElement('textarea')
          Summary.innerHTML = product.summary
          setSummary(Summary.value)
        }
        actualText()
      })
    }, [])   
  }

  const handlePhotoDeletion = async (path: string) => {
    const isConfirmed = window.confirm('Are you sure you want todelete this photo')

    if (isConfirmed) {
      deleteProductPhoto(path)
      const newPhotos = photos.filter(photo => photo !== path)
      setPhotos(newPhotos)
    }
  }

  if (name === '') {
    return <main>Product not found</main>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleEditSubcategory = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    editProduct({field: activeInput, value: e.target.value, product_id: id,type})
    setSubCategory(e.target.value)
    setInput('')
  }

  const handleEditProduct = () => {
    editProduct({field: activeInput, value, product_id: id, type})
    setInput('')
    if (activeInput === 'name' && typeof value === 'string') {
      setName(value)
    }

    if (activeInput === 'cost' && typeof value === 'string') {
      setCost(parseInt(value))
    }

    if (activeInput === 'quantity' && typeof value === 'string') {
      setQuantity(parseInt(value))
    }

    if (activeInput === 'description' && typeof value === 'string') {
      setDescription(value)
    }

    if (activeInput === 'summary' && typeof value === 'string') {
      setSummary(value)
    }

    if (activeInput === 'author' && typeof value === 'string') {
      setAuthor(value)
    }
    if (activeInput === 'production_time' && typeof value === 'string') {
      setProductionTime(parseInt(value))
    }

    if (activeInput === 'sub_category' && typeof value === 'string') {
      setSubCategory(value)
    }

    if (activeInput === 'path' && typeof value === 'string') {
      setPath(value)
    }

  }

  const validateFile = (file: File) => {

    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']
    const maxSize = 2 * 1024 * 1024 //2mb

    if (file && !allowedFileTypes.includes(file.type)) {
      return 'Only png, jpg and gif formats are allowed'
    }
    if (file && file.size > maxSize) {
      return 'File must not be larger than 2MB'
    }
    return true
  }

  const handlePhotoAddition = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files
    
    if (!files || files.length === 0 ) {
      setNewPhotoError('no photo set')
      return
    }
    const noError = validateFile(files[0])
    setNewPhotoError(noError === true ? '' : noError)

    if (files[0] && noError === true) {

        const addPhoto = async () => {
          const photo:string = await addProductPhoto(files[0], id, type)
          const newPhotos = photos
          newPhotos.push(photo)
          setPhotos(newPhotos)
          window.location.reload()
        }
        addPhoto()
    }

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
              {photos.map((photo, index) => (
                  <SwiperSlide key={index} className={styles.slide}>
                    <div className={styles.photoDeleteBtnWrapper}>
                      <button 
                        onClick={(e) => {
                          handlePhotoDeletion(photo);
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
          <article className={styles.addPhoto}>
            <form>
              <div>
                <label htmlFor="photoInput">
                    <Icon 
                      icon="material-symbols:add-photo-alternate-outline-rounded"
                      width={24} 
                      height={24} 
                      color="#f0f0f0"
                    />
                </label>
                <input
                  type="file"
                  accept=".png, .jpg, .gif, .jpeg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhotoAddition(e)}
                  style={{ display: 'none' }}
                  id="photoInput"
                />
                {newPhotoError && <span>{newPhotoError}</span>}
              </div>
            </form>
          </article>
          <article className={styles.details}>
            <h1>Product Details</h1>
            <div className={styles.edit}>
              <div className={styles.field}>
                {activeInput !== 'name' &&
                  <>
                    <span>{name}</span>
                    <button onClick={() => setInput('name')}>
                      <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                    </button>
                  </>
                }
                {activeInput === 'name' && 
                  <form>
                    <input type="text" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                    <button onClick={handleEditProduct} type="button">   
                      <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                    </button>
                  </form>
                }
              </div>
              { type === 'books' &&
                <div className={styles.field}>
                  {activeInput !== 'author' &&
                    <>
                      <span>{author}</span>
                      <button onClick={() => setInput('author')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'author' && 
                    <form>
                      <input type="text" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                      <button onClick={handleEditProduct} type="button">   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              <div className={styles.field}>
                  {activeInput !== 'cost' &&
                    <>
                      <span>KES. {cost}</span>
                      <button onClick={() => setInput('cost')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'cost' && 
                    <form>
                      <input type="number" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                      <button onClick={handleEditProduct} type="button">   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
              </div>
              { (type === 'retail' || type === 'books') &&
                <div className={styles.field}>
                  {activeInput !== 'quantity' &&
                    <>
                      <span>quantity: {quantity}</span>
                      <button onClick={() => setInput('quantity')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'quantity' && 
                    <form>
                      <input type="number" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                      <button onClick={handleEditProduct} type="button">   
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
                      <span>{description}</span>
                      <button onClick={() => setInput('description')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'description' && 
                    <form>
                      <input type="textarea" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                      <button onClick={handleEditProduct} type="button">   
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
                      <span>{summary}</span>
                      <button onClick={() => setInput('summary')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'summary' && 
                    <form>
                      <input type="textarea" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                      <button onClick={handleEditProduct} type="button">   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              {(type === 'retail' || type == 'custom') &&
                <div className={styles.field}>
                  {activeInput !== 'sub_category' &&
                    <>
                      <span>Sub-category: {sub_category}</span>
                      <button onClick={() => setInput('sub_category')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'sub_category' && 
                    <form>
                      <select onChange={(e)=> handleEditSubcategory(e)}>
                        <option value="select">select</option>
                          {category === 'apparel' && 
                            apparelSubcategories.map((subcategory,index)=> 
                              ( <option key={index} value={subcategory.value}>
                                  {subcategory.label}
                                </option>
                              ))
                          }
                          {category === 'jewellery' && 
                            jewellerySubcategories.map((subcategory,index)=> 
                              ( <option key={index} value={subcategory.value}>
                                  {subcategory.label}
                                </option>
                              ))
                            }
                          {category === 'shoes' && 
                            shoesSubcategories.map((subcategory,index)=> 
                              ( <option key={index} value={subcategory.value}>
                                  {subcategory.label}
                                </option>
                              ))
                          }
                          {category === 'decor' && 
                            decorSubcategories.map((subcategory,index)=> 
                              ( <option key={index} value={subcategory.value}>
                                  {subcategory.label}
                                </option>
                              ))
                          }
                      </select>
                    </form>
                  }
                </div>
              }
              { type === 'custom' &&
                <div className={styles.field}>
                  {activeInput !== 'production_time' && 
                    <>
                      <span>production time: {production_time} hrs</span>
                      <button onClick={() => setInput('production-time')}>
                        <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                      </button>
                    </>
                  }
                  {activeInput === 'production_time' &&
                    <form>
                      <input type="number" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                      <button onClick={handleEditProduct} type="button">   
                        <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                      </button>
                    </form>
                  }
                </div>
              }
              {type === 'digital' && 
                <form>
                  <input type="file" />
                  <button onClick={handleEditProduct} type="button">   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>
            <div className={styles.buttons}>
              <div className={styles.visibility}>
                { (type === 'custom' || type === 'digital') && active === true && 
                  <button>hide</button>
                }
                { (type === 'custom' || type === 'digital') && active === false && 
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