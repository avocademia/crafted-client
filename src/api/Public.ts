import axios from "axios"
import { toast } from "react-toastify"
import { ErrorData, KlosetData, KlosetType } from "../Types"

const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL


export const populateShop = async() => {
    try {
        const response = await axios.get(`${environment === 'production'? prodUrl:devUrl}/api/shop`)
        const products = response.data.products
        return products
    } catch (error: ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})    
    }
}

export const populateKlosets = async () => {
    try {
        const response = await axios.get(`${environment === 'production'?prodUrl:devUrl}/api/klosets`)
        return response.data.klosets as KlosetData[]
    } catch (error:ErrorData) {
        toast.error(error.response.data.error)
    }
}

export const populateProductPage =async (productId:number, type:KlosetType) => {

    try {
        const response = await axios.get(`${environment === 'production'?prodUrl:devUrl}/api/product/${productId}&${type}`)
        return response.data.product
    } catch (error: ErrorData) {
        toast.error(error.response.data.error)
    }
}

export const populateKlosetPage = async (klosetId:number) => {

    try {
        const response = await axios.get(`${environment === 'production'?prodUrl:devUrl}/api/kloset/${klosetId}`)
        return response.data.kloset
    } catch (error:ErrorData) {
        toast.error(error.response.data.error)
    }
}