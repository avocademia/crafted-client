'use client'

import { useForm } from "react-hook-form"
import { useEffect, useState, ChangeEvent } from "react"
import { Icon } from "@iconify/react"
import styles from './addKloset.module.scss'
import Image from "next/image"
import { addKloset } from "../../../api/Admin"
import { toast, ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"
import {KlosetFormData } from "../../../Types"

const AddKloset = () => {

  const {handleSubmit, register, formState: {errors} , reset} = useForm<KlosetFormData>()
  const [delivery, setDelivery] = useState(false)
  const [user,setUser] = useState<number>()
  const [profilePicError, setProfilePicError] = useState('')
  const [ppReview, setPPReview] = useState<string|null>()
  const [loading, setLoading] = useState(false)
  const [selectedType, setType] = useState('')
  const router = useRouter()

  const userId = () => {
    const id = parseInt(localStorage.getItem('userId') ?? '0', 10)
    setUser(id)
  }
 
  useEffect(() => {
    userId()
  },[])

  const handleDeliveryState = (e: ChangeEvent<HTMLInputElement>) => {
    setDelivery(e.target.value? true: false)
  }

  const handleSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
      setType(e.target.value)
  }

  const onSubmit = async (data: KlosetFormData) => {

    setLoading(true)
    const address = `${data.shopNo}, ${data.building}, ${data.street}`
    const inputElement = document.getElementById('ppInput') as HTMLInputElement | null;
    const dp = inputElement?.files? inputElement.files[0] : null

    const klosetData = {
      data,
      address,
      user,
      dp
    }

    try {
      
      await addKloset(klosetData)
      toast.info('Kloset successfully created', {hideProgressBar: true})
      router.push('/admin')
      reset()
      setLoading(false)
    } catch (error) {
      toast.error('an error occured creating closet', {hideProgressBar: true})
      setLoading(false)
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

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0 ) {
      setProfilePicError('np dp set')
      setPPReview(null)
      return
    }
    const noError = validateFile(files[0])
    setProfilePicError(noError === true ? '' : noError)

    if (files[0] && noError === true) {

      const reader = new FileReader()
      reader.onload = () => {
        setPPReview(typeof reader.result === 'string'? reader.result: null)
      }
      reader.readAsDataURL(files[0])

    } else {
      setPPReview(null)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="ppInput">
            Profile Picture
            <div className={styles.ppContainer}>
              {ppReview ?
                <Image src={ppReview} alt="Profile Preview" width={100} height={100}  /> :
                <Icon icon="ic:outline-plus" style={{ color: '#070100' }} />
              }
            </div>
          </label>
          <input
            type="file"
            accept=".png, .jpg, .gif"
            onChange={onFileChange}
            style={{ display: 'none' }}
            id="ppInput"
          />
          {profilePicError && <span>{profilePicError}</span>}
        </div>
        <div>
          <label>name</label>
          <input type="text" {...register('name', {required: 'Kloset name required'})} />
          {(errors.name && typeof errors.name.message === 'string') && 
            <span>{errors.name.message}</span>
          }
        </div>
        <div>
          <label>slogan</label>
          <input type="text" {...register('slogan')}/>
          {(errors.slogan && typeof errors.slogan.message === 'string')&& 
            <span>{errors.slogan.message}</span>
          }
        </div>
        <div>
          <label>type</label>
          <select {...register('type', {required: 'type is required'})} onChange={handleSelectedType} >
            <option value="select type">select type</option>
            <option value="retail">retail</option>
            <option value="custom">custom</option>
            <option value="digital">digital</option>
            <option value="books">books</option>
          </select>
          {(errors.type && typeof errors.type.message === 'string')&& 
            <span>{errors.type.message}</span>
          }
        </div>
        { (selectedType === 'retail' || selectedType === 'custom') &&
          <div>
            <label>category</label>
            <select {...register('category', {required: 'category is required'})}>
              <option value="select">select</option>
              <option value="apparel">apparel</option>
              <option value="jewellery">jewellery</option>
              <option value="shoes">shoes</option>
              <option value="decor">decor</option>
            </select>
            {(errors.category && typeof errors.category.message === 'string' )&& 
              <span>{errors.category.message}</span>
            }
          </div>
        }
        {selectedType !== 'digital' &&
          <div>
             <div>
              <label>Shop Number</label>
              <input type="text" {...register('shopNo')}/>
            </div>
            <div>
              <label>building</label>
              <input type="text" {...register('building')}/>
            </div>
            <div>
              <label>street</label>
              <input type="text" {...register('street')}/>
            </div>
            <div>
              <label>Delivery?</label>
              <input type="checkbox" {...register('delivery')} onChange={handleDeliveryState} />
            </div>
          </div>
        }
        {delivery &&           
            <div>
              <label>Delivery Time</label>
              <select {...register('delivery_time')} >
                <option value="select">select (days)</option>
                {[...Array(7).keys()].map((n) => {
                  return <option key={n+1} value={n+1}>{n+1}</option>
                })}
              </select>
            </div>  
        }
        <button type="submit">create</button>
      </form>
      <ToastContainer/>
    </main>
  )
}
export default AddKloset