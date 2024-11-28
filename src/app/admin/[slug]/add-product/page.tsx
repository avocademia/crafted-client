'use client'

import ManageKlosetNav from '../../../../components/navbars/ManageKlosetNav'
import styles from './products.module.css'
import { usePathname, useParams } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useState, ChangeEvent } from "react"
import { Icon } from "@iconify/react"
import Image from "next/image"
import Select,  { MultiValue, ActionMeta } from "react-select"
import { validateImages } from '../../../../Helpers'
import { addProduct, deleteDigitalFile, saveDigitalProduct, fetchSingleKloset } from '../../../../api/Admin'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation"
import { Genre, ProductFormData } from '../../../../Types'

const addProductPage = () => {
  const router = useRouter()
  const params = useParams()
  const {slug} = params
  const pathname = usePathname()
  const hideSettingsButton = pathname?.includes('/add-product')
  const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm()
  const [photoReviews, setPhotoReviews] = useState<(string|ArrayBuffer|null)[]>([null, null, null, null])
  const [photoErrors, setPhotoErrors] = useState<(string|null|false)[]|string>()
  const [quantity, setQuantity] = useState(1)
  const [kloset, setKloset] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedType, setSelectedType] = useState()
  const [digitalFileError, setDigitalFileError] = useState<string|null>()
  const [currentFilePath, setCurrentFilePath] = useState()

  const genreOptions = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'sci-fi', label: 'Sci-Fi' },
  ]

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

  useEffect(()=> {
      const fetchKloset = async () => {
        const data = await fetchSingleKloset(slug)
        setSelectedCategory(data[0].category)
        setSelectedType(data[0].type)
        setValue('category', data[0].category)
        setValue('type', data[0].type)
      }
      fetchKloset()
  }, [currentFilePath])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    addProduct(data, slug)
    reset()
    router.back()
  }

  interface OnFileChangeProps {
    e: ChangeEvent<HTMLInputElement>,
    index: number
  }

  const onFileChange = ({e, index}: OnFileChangeProps) => {
    const target = e.target as HTMLInputElement; 

    if (!target.files || target.files.length === 0) {
      setPhotoErrors('No Images Detected')
      return
    }

    const error = validateImages(target.files[0])
    setPhotoErrors(error === true ? '' : 'Image validation error')

      if (target.files[0] && error === true) {
          const reader = new FileReader()
          reader.onloadend = () => {
              const newPhotoReviews = [...photoReviews]
              if (typeof newPhotoReviews[index] === 'string') {
                newPhotoReviews[index] = reader.result
                setPhotoReviews(newPhotoReviews)
              }
          }
          setValue(`product_photo_${index + 1}`, target.files[0])
      reader.readAsDataURL(target.files[0])
    }
  }

  interface SelectedOption {
    field: string,
    value: string
  }

  const onGenreChange = (selectedOptions: MultiValue<{value: string, label: string}>) => {
      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : []
      setValue('genres', selectedValues)
  }

  const incrementQuantity = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1
      setValue('quantity', newQuantity)
      return newQuantity
    })
  }

  const decrementQuantity = () => {
    setQuantity(prev => {
      const newQuantity = prev - 1
      setValue('quantity', newQuantity)
      return newQuantity
    })
  }

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(parseInt(e.target.value))
    setQuantity(value)
    setValue('quantity', value)
  }

  const onDigitalFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    if (!target.files || target.files.length === 0) {
      setDigitalFileError('No file detected')
      return
    }
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (target.files[0] && target.files[0].size > maxSize) {
      setDigitalFileError("File size should be less than 50MB.")
    } else {
      if (currentFilePath) {
        deleteDigitalFile(currentFilePath)
      }
      setDigitalFileError(null)
      const path = await saveDigitalProduct(target.files[0])
      if (!path) {
        return setDigitalFileError('file path not received')
      }
      setCurrentFilePath(path.data.path)
      setValue('path', path.data.path)
    }
  }

  return (
    <main className={styles.main}>
        <ManageKlosetNav hideSettingsButton={hideSettingsButton} slug={slug}/>
        <ToastContainer/>
        <section className={styles.mainSection}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldContainer}>
              <label>name</label>
              <input type="text" {...register('name', {required: 'name is required'})} />
              {(errors.name && typeof errors.name.message === 'string' ) && 
                <span>{errors.name.message}</span>
              } 
            </div>
            {selectedType === 'books' && 
              <div className={styles.fieldContainer}>
                <label>author</label>
                <input type="text" {...register('author')} />
              </div>
            }
            <div className={styles.fieldContainer}>
              <label>cost</label>
              <div className={styles.currencyContainer}>
                <span className={styles.currencyLabel}>
                  <Icon icon="twemoji:flag-kenya" className={styles.flag}/> 
                  KES
                </span>
                <input 
                  type="number" 
                  {...register('cost', {required: 'Product cost is required'})} 
                  className={styles.costInput} 
                />
              </div>
              {(errors.cost && typeof errors.cost.message === 'string')&& 
                <span>{errors.cost.message}</span>
              } 
            </div>
            {selectedType === 'custom' &&
              <div className={styles.fieldContainer}>
                <label>production time</label>
                <input 
                  type="number" 
                  {...register('production_time')} 
                  className={styles.inputs}
                  placeholder="in hours" 
                />
              </div>
            }
            {(selectedType === 'retail' || selectedType == 'books') &&
              <div className={styles.fieldContainer}>
                <label>quantity</label>
                <button type="button" onClick={decrementQuantity} className={styles.quantityButton}>-</button>
                <input 
                  type="number" 
                  {...register('quantity')} 
                  className={styles.inputs} 
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button type="button" onClick={incrementQuantity} className={styles.quantityButton}>+</button>
              </div>
            }
            {selectedType === 'digital' && 
              <div className={styles.fieldContainer}>
                <label>Upload Digital Product</label>
                <input
                  type="file"
                  onChange={onDigitalFileChange}
                />
                {digitalFileError && <span>{digitalFileError}</span>}
              </div>
            }
            {(selectedType === 'retail' || selectedType == 'custom' || selectedType == 'digital') &&
              <div className={styles.fieldContainer}>
                <label>description</label>
                <textarea 
                {...register('description')} 
                placeholder="Enter product description here..."
                />
              </div>
            }
            {selectedType == 'books' &&
              <div className={styles.fieldContainer}>
                <label>synopsis</label>
                <textarea 
                {...register('summary')} 
                placeholder="Enter book summary here..."
                />
              </div>
            }
            {(selectedType === 'retail' || selectedType == 'books') &&
              <div>
                <label>condition</label>
                <select {...register('condition')}>
                  <option value="select">select</option>
                  <option value="used">used</option>
                  <option value="thrifted">thifted</option>
                  <option value="brand new">brand new</option>
                </select>
              </div>
            }
            <p>category: {selectedCategory}</p>
            {(selectedType === 'retail' || selectedType == 'custom') &&
              <div className={styles.fieldContainer}>
                <label>sub-category</label>
                <select {...register('sub_category')}>
                  <option value="select">select</option>
                  {selectedCategory === 'apparel' && 
                    apparelSubcategories.map((subcategory,index)=> 
                      ( <option key={index} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))
                  }
                  {selectedCategory === 'jewellery' && 
                    jewellerySubcategories.map((subcategory,index)=> 
                      ( <option key={index} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))
                  }
                  {selectedCategory === 'shoes' && 
                    shoesSubcategories.map((subcategory,index)=> 
                      ( <option key={index} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))
                  }
                  {selectedCategory === 'decor' && 
                    decorSubcategories.map((subcategory,index)=> 
                      ( <option key={index} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))
                  }
                </select>
              </div>
            }
            {selectedType === 'books' &&
              <div className={styles.fieldContainer}>
                <label>Genres</label>
                <Select 
                  isMulti
                  options={genreOptions}
                  {...register('genres')}
                  onChange={onGenreChange}
                  id={`bookGenre`}
                />
              </div>
            }
            <div className={styles.photosContainer}>
              <label>Product photos</label>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  <label htmlFor={`photoInput${index}`}> 
                    <div className={styles.photoContainer}>
                      {photoReviews.map((src, index) => {
                        if (typeof src === 'string') {
                          return (
                            <Image 
                              key={index}
                              src={src}
                              alt={`Product Image ${index + 1}`}
                              width={500}
                              height={500}
                            />
                          )
                        } else {
                          return (
                            <Icon icon="ic:outline-plus" style={{ color: '#070100' }} />
                          )
                        }
                      })}
                    </div>
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .gif"
                    {...register(`product_photo_${index}`)}
                    onChange={(e) => onFileChange({e, index:index - 1})}
                    style={{ display: 'none' }}
                    id={`photoInput${index}`}
                  />
                  {photoErrors? photoErrors[index - 1] && <span>{photoErrors[index - 1]}</span> : <></>}
                </div>
              ))}
            </div>
            <button type="submit">Add</button>
          </form>
        </section>
    </main>
  )
}
export default addProductPage