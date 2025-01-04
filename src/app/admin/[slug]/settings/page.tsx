'use client'

import ManageKlosetNav from "../../../../components/navbars/ManageKlosetNav"
import { usePathname, useParams } from "next/navigation"
import styles from './klosetSettings.module.scss'
import { useState, useEffect } from "react"
import { fetchSingleKloset, editKloset } from "../../../../api/Admin"
import { Category, KlosetData, KlosetType } from "../../../../Types"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { toast } from "react-toastify"

const klosetSettings = () => {
  const [name, setName] = useState<string>()
  const [slogan, setSlogan] = useState<string>()
  const [category, setCategory] = useState<Category>()
  const [dp, setDP] = useState<string|null>()
  const [banner, setBanner] = useState<string|null>()
  const [delivery, setDelivery] = useState<boolean>()
  const [active, setActive] = useState<boolean>()
  const [delivery_time, setDT] = useState<number>()
  const [address, setAddress ] = useState<string>()
  const [type, setType] = useState<KlosetType>()
  const [created_at, setCA] = useState<Date>()
  const [followers,setFollowers] = useState<string[]|null>()
  const [activeInput, setInput] = useState('')
  const [value, setValue] = useState<string|number|boolean>('')
  const [street, setStreet] = useState<string>()
  const [building, setBuilding] = useState<string>()
  const [shop, setShop] = useState<string>()

  const pathname = usePathname()
  const params = useParams()
  const {slug} = params
  const hideSettingsButton = pathname?.includes('/settings')

  const environment = process.env.NEXT_PUBLIC_NODE_ENV
  const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
  const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

  if (typeof slug === 'string') {

    useEffect (() => {
        fetchSingleKloset(parseInt(slug)).then(kloset => {
          const Kloset = kloset as KlosetData
          setBanner(Kloset.banner)
          setCategory(Kloset.category)
          setDelivery(Kloset.delivery)
          setActive(Kloset.active)
          setDP(Kloset.dp)
          setCA(Kloset.created_at)  //unchanged
          setDT(Kloset.delivery_time)
          setFollowers(Kloset.followers) //unchanged
          setType(Kloset.type) //unchanged
          const actualText = () => {
            const Slogan = document.createElement('textarea')
            Slogan.innerHTML = Kloset.slogan
            setSlogan(Slogan.value)

            const Name = document.createElement('textarea')
            Name.innerHTML = Kloset.name
            setName(Name.value)

            const Address = document.createElement('textarea')
            Address.innerHTML = Kloset.address
            setAddress(Address.value)
          }
          actualText()
        })
    }, [])

  }

  const handlePhotoDeletion = (path: string) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this photo')
  
      if (isConfirmed) {
        console.log('deleted')
      }
    }
  
    if (name === '') {
      return <main>Product not found</main>
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value)
    }
  
    const handleEditProduct = () => {
      editKloset()
      setInput('')
      console.log(activeInput)
      if (activeInput === 'name' && typeof value === 'string') {
        setName(value)
      }

      if (activeInput === 'slogan' && typeof value === 'string') {
        setSlogan(value)
      }
  
      if (activeInput === 'category' && typeof value === 'string') {
        const actualValue = value as Category
        setAddress(actualValue)
      }
  
      if (activeInput === 'delivery_time' && typeof value === 'string') {
        setDT(parseInt(value))
      }

      if (activeInput === 'address' && shop && building && street) {
        const newAddress = shop + ', ' + building + ', ' + street + '.'
        console.log(newAddress)
        setAddress(newAddress)
      }
  
    }

    const handleDeliveryStatusChange = () => {
      console.log('changing delievery status')
    }

    console.log(address?.length)


  return (
    <>
      <ManageKlosetNav hideSettingsButton={hideSettingsButton} slug={slug} />
      <main className={styles.page} >
        
        <section className={styles.mainSection}>
          <article>
            <div className={styles.bannerContainer}>
              <div className={styles.photoDeleteBtnWrapper}>
                <button 
                  onClick={(e) => {
                    if (banner) {
                      handlePhotoDeletion(banner)
                    }
                  }}
                  className={styles.photoDeleteBtn}
                >
                  <Icon 
                    icon="material-symbols:add-photo-alternate-outline-rounded"
                    width={24} 
                    height={24} 
                    color="#f0f0f0"
                  />
                </button>

                <Image
                  src={banner? `${environment === 'production' ? prodUrl : devUrl}/${banner}` : '/banner.jpg' }
                  alt="product photo"
                  height={180}
                  width={180}
                  className={styles.banner}
                />
              </div> 
            </div>

            <div className={styles.dpContainer}>
              <div className={styles.photoDeleteBtnWrapper}>
                <button 
                  onClick={(e) => {
                    if (dp) {
                      handlePhotoDeletion(dp)
                    }
                  }}
                  className={styles.photoDeleteBtn}
                >
                  <Icon 
                    icon="material-symbols:add-photo-alternate-outline-rounded"
                    width={24} 
                    height={24} 
                    color="#f0f0f0"
                  />
                </button>

                <Image
                  src={dp? `${environment === 'production' ? prodUrl : devUrl}/${dp}` : '/user.png'}
                  alt="product photo"
                  height={180}
                  width={180}
                  className={styles.dp}
                />
              </div> 
            </div>
     
          </article>
          <article>
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
            <div className={styles.field}>
              {activeInput !== 'slogan' &&
                <>
                  <span>{slogan}</span>
                  <button onClick={() => setInput('slogan')}>
                    <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                  </button>
                </>
              }
              {activeInput === 'slogan' && 
                <form>
                  <input type="text" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                  <button onClick={handleEditProduct} type="button">   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>
            {address && address?.length > 4 && <div className={styles.field}>
              {activeInput !== 'address' &&
                <>
                  <span>Address: {address}</span>
                  <button onClick={() => setInput('address')}>
                    <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                  </button>
                </>
              }
              {activeInput === 'address' && 
                <form>
                  <div>
                    <div>
                      <label>Shop Number</label>
                      <input type="text" onChange={(e) => setShop(e.target.value)}/>
                    </div>
                    <div>
                      <label>building</label>
                      <input type="text" onChange={(e) => setBuilding(e.target.value)}/>
                    </div>
                    <div>
                      <label>street</label>
                      <input type="text" onChange={(e) => setStreet(e.target.value)}/>
                    </div>
                  </div>
                  <button onClick={handleEditProduct} type="button">   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>}
            <div className={styles.field}>
              Delivery: 
                {delivery && <p>available</p>}
                {!delivery && <p>not available</p>}
                <button onClick={() => handleDeliveryStatusChange()}>
                  <Icon icon="material-symbols:question-exchange-rounded" width={24} height={24} color= '#3b0000' />
                </button>
            </div>
            <div className={styles.field}>
              {activeInput !== 'delivery_time' &&
                <>
                  <span>Delivery Time: {delivery_time} days </span>
                  <button onClick={() => setInput('delivery_time')}>
                    <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                  </button>
                </>
              }
              {activeInput === 'delivery_time' && 
                <form>
                  <input type="number" className={styles.input} onChange={(e) => handleInputChange(e)}/>
                  <button onClick={handleEditProduct} type="button">   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>
            <div className={styles.field}>
              {activeInput !== 'category' &&
                <>
                  <span>Category: {category} </span>
                  <button onClick={() => setInput('category')}>
                    <Icon icon="akar-icons:edit" width={24} height={24} color='#002d00'/>
                  </button>
                </>
              }
              {activeInput === 'category' && 
                <form>
                  <select className={styles.input} onChange={(e) => handleInputChange(e)}>
                    <option value="select">select</option>
                    <option value="apparel">apparel</option>
                    <option value="jewellery">jewellery</option>
                    <option value="shoes">shoes</option>
                    <option value="decor">decor</option>
                  </select>
                  <button onClick={handleEditProduct} type="button">   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>
          </article>
        </section>
      </main>
    </>
  )
}
export default klosetSettings