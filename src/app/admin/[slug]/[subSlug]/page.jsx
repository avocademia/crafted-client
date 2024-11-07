'use client'

import { fetchSingleProduct } from "@/api/Admin"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const adminProductPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const {subSlug} = params
  const type = searchParams.get('type')
  const queryParams = {type: type,product_id: subSlug}
  const [product, setProduct] = useState({name: 'name'})

  const fetchProduct = async () => {
      const data = await fetchSingleProduct(queryParams)
      const response = Object.values(data)
      setProduct(response[0])
  }

  useEffect(() => {
    if (type && subSlug) {
      fetchProduct()
    }
  }, [type, subSlug]) 

  return (
    <main>
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