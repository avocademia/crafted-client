'use client'

import { fetchSingleProduct } from "../../../../api/Admin"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { KlosetType, Product } from "../../../../Types"
import { ToastContainer } from "react-toastify"

const adminProductPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const {subSlug} = params
  const type = searchParams.get('type') as KlosetType
  const [product, setProduct] = useState<Product>()

  if (type && typeof subSlug === 'string') {

    const queryParams = {type: type,product_id: parseInt(subSlug)}

    const fetchProduct = async () => {
        const data = await fetchSingleProduct(queryParams)
        if (data) {
          const response: Product[] = Object.values(data)
          setProduct(response[0])
        }    
    }

    useEffect(() => {
      fetchProduct()
    }, [])   
  }

  if (product === undefined) {
    return <main>Product not found</main>
  }

  return (
    <main>
      <ToastContainer/>
      {type === 'retail' &&
        <article>
          <div>
            <input type="text" placeholder={product.name}/>
            <button>Change</button>
          </div>
          <div>
            <textarea placeholder={product.description}/>
            <button>Change</button>
          </div>
          <div>
            <input type="number" placeholder={`KES. ${product.cost}`}/>
            <button>Change</button>
          </div>
        </article>
      }
      {type === 'custom' &&
        <article>
          <div>
            <input type="text" placeholder={product.name}/>
            <button>Change</button>
          </div>
          <div>
            <textarea placeholder={product.description}/>
            <button>Change</button>
          </div>
          <div>
            <input type="number" placeholder={`KES. ${product.cost}`}/>
            <button>Change</button>
          </div>
        </article>
      }
      {type === 'digital' &&
        <article>
          <div>
            <input type="text" placeholder={product.name}/>
            <button>Change</button>
          </div>
          <div>
            <textarea placeholder={product.description}/>
            <button>Change</button>
          </div>
          <div>
            <input type="number" placeholder={`KES. ${product.cost}`}/>
            <button>Change</button>
          </div>
        </article>
      }
      {type === 'books' &&
        <article>
          <div>
            <input type="text" placeholder={product.name}/>
            <button>Change</button>
          </div>
          <div>
            <textarea placeholder={product.summary}/>
            <button>Change</button>
          </div>
          <div>
            <input type="number" placeholder={`KES. ${product.cost}`}/>
            <button>Change</button>
          </div>
        </article>
      }
    </main>
  )
}
export default adminProductPage