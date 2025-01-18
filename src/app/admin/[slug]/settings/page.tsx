'use client'

import ManageKlosetNav from "../../../../components/navbars/ManageKlosetNav"
import { usePathname, useParams } from "next/navigation"
import styles from './klosetSettings.module.scss'
import { useState, useEffect } from "react"
import { fetchSingleKloset, editKloset, editKlosetBanner, editKlosetDP } from "../../../../api/Admin"
import { Category, KlosetData, KlosetType } from "../../../../Types"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { toast } from "react-toastify"

const klosetSettings = () => {
  const [id, setId] = useState<number>(0)
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
          setId(kloset.id)
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  const handleEditAddress = () => {
      const newAddress = shop + ', ' + building + ', ' + street + '.'
      setAddress(newAddress)
      editKloset({field: activeInput, value:newAddress, kloset_id:id})
      setInput('')
  }
  
  const handleEditProduct = () => {
        editKloset({field: activeInput, value, kloset_id:id})
        setInput('')
      
      if (activeInput === 'name' && typeof value === 'string') {
        setName(value)
      }

      if (activeInput === 'slogan' && typeof value === 'string') {
        setSlogan(value)
      }
  
      if (activeInput === 'delivery_time' && typeof value === 'string') {
        setDT(parseInt(value))
      }

  }

  const handleDeliveryStatusChange = () => {
      console.log('changing delievery status')
      //delivery_time = 0
      //if change to true, delivery_time = 1
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

  const handleBannerChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files

    if (!fileList || fileList.length === 0 ) {
      toast.error('no file added')
      return
    }

    const noError = validateFile(fileList[0])
    if (noError !== true){
      toast.error(noError)
    }

    if (fileList && noError === true) {
      editKlosetBanner(fileList[0], id).then(path => {
        setBanner(path)
      })
    }
  }

  const handleDPChange = (e:React.ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files

    if (!fileList || fileList.length === 0 ) {
      toast.error('no file added')
      return
    }

    const noError = validateFile(fileList[0])
    if (noError !== true){
      toast.error(noError)
    }

    if (fileList && noError === true) {
      editKlosetDP(fileList[0], id).then(path => {
        setDP(path)
      })
    }

    window.location.reload()

  }

  if (name === '') {
    return <main>loading...</main>
  }

  return (
    <>
      <ManageKlosetNav hideSettingsButton={hideSettingsButton} slug={slug} />
      <main className={styles.page} >
        
        <section className={styles.mainSection}>
          <article>
            <div className={styles.bannerContainer}>
              <div className={styles.changeBannerWrapper}>
                <label htmlFor="bannerInput">
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBannerChange(e)}
                  style={{ display: 'none' }}
                  id="bannerInput"
                />
              </div> 
              <Image
                  src={banner? `${environment === 'production' ? prodUrl : devUrl}/${banner}` : '/banner.jpg' }
                  alt="product photo"
                  height={180}
                  width={180}
                  className={styles.banner}
              />
            </div>

            <div className={styles.dpContainer}>
              <div className={styles.changeDOWrapper}>
                <label htmlFor="DPInput">
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDPChange(e)}
                  style={{ display: 'none' }}
                  id="DPInput"
                />
              </div> 

              <Image
                src={dp? `${environment === 'production' ? prodUrl : devUrl}/${dp}` : '/user.png'}
                alt="logo"
                height={180}
                width={180}
                className={styles.dp}
              /> 
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
            {type !== 'digital'&&
            <div className={styles.field}>
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
                  <button onClick={handleEditAddress} type="button">   
                    <Icon icon="icon-park-solid:save" width={24} height={24} color='#002d00'/>
                  </button>
                </form>
              }
            </div>}
            {type !== 'digital' &&

              <>
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
              </>
            }
          </article>
        </section>
      </main>
    </>
  )
}
export default klosetSettings