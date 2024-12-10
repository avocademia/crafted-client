import axios from "axios"
import { toast } from "react-toastify"
import { ErrorData, KlosetData, KlosetFormData, KlosetType, ProductFormData, Role } from "../Types"
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

interface APIKlosetFormData {
    data: KlosetFormData,
    address: string,
    dp: File|null,
}

export const addKloset = async (klosetData:APIKlosetFormData) => {

    try {

        const formData = new FormData()

        formData.append('name', klosetData.data.name)
        formData.append('slogan', klosetData.data.slogan)
        formData.append('type', klosetData.data.type)
        formData.append('category', klosetData.data.category? klosetData.data.category: '')
        formData.append('delivery', klosetData.data.delivery? 'true': 'false')
        formData.append('address', klosetData.address)
        formData.append('delivery_time', klosetData.data.delivery_time? klosetData.data.delivery_time.toString(): '0')
        formData.append('dp', klosetData.dp? klosetData.dp: '')

        /*for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }*/

        await axios.post(`${serverUrl}/api/admins/add-kloset`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const verifyFirstAdmin = async () => {

    try {
        const response = await axios.get(`${serverUrl}/api/admins/verify-first-admin`, {withCredentials: true})
        return response.data.isFirstAdmin
    } catch (error:ErrorData) {
        console.log(error)
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const fetchUsers = async () => {

    try {
        const response = await axios.get(`${serverUrl}/api/admins/fetch-users`, {withCredentials: true})
        return response.data.users
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const changeRole = async (data:Role) => {

    try {
        await axios.post(`${serverUrl}/api/admins/change-role`, data, {withCredentials: true})
        toast.info('Role change successful', {hideProgressBar: true})
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const fetchKlosets = async () => {

    try {
        const response = await axios.get(`${serverUrl}/api/admins/fetch-klosets`, {withCredentials: true})
        return response.data.klosets
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const fetchSingleKloset = async (klosetId:number) => {

    try {
        const response = await axios.get(`${serverUrl}/api/admins/kloset/${klosetId}`, {withCredentials: true})
        return response.data.kloset
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const addProduct = async (data:ProductFormData, slug:string) => {

    try {
        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('cost', data.cost.toString())
        formData.append('type', data.type)
        if (data.category) {
            formData.append('category', data.category)
        }
        if (data.sub_category) {
            formData.append('sub_category', data.sub_category)
        }
        if (data.description) {
            formData.append('description', data.description)
        }
        if (data.summary) {
            formData.append('summary', data.summary)
        }
        if (data.condition) {
            formData.append('condition', data.condition)
        }
        if (data.genres) {
            data.genres.forEach((genre) => {
                formData.append('genres[]', genre)
            })
        }
        if (data.production_time) {
            formData.append('production_time', data.production_time.toString())
        }
        if (data.quantity) {
            formData.append('quantity', data.quantity.toString())
        } 
        if (data.path) {
            formData.append('path', data.path)
        }
        if (data.product_photo_1) {
            formData.append('photo1', data.product_photo_1)
        }
        if (data.product_photo_2) {
            formData.append('photo2', data.product_photo_2)
        }
        if (data.product_photo_3) {
            formData.append('photo3', data.product_photo_3)
        }
        if (data.product_photo_4) {
            formData.append('photo4', data.product_photo_4)
        }
        if (data.product_photo_5) {
            formData.append('photo5', data.product_photo_5)
        }
        if (data.author) {
            formData.append('author', data.author)
        }

        /*for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }*/
        await axios.post(`${serverUrl}/api/admins/kloset/${slug}/add-product`, formData, {withCredentials: true})
        toast.info('Product added succesfully', {hideProgressBar: true})
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const saveDigitalProduct = async (file:File) => {

    try {

        const formData = new FormData()
        formData.append('digital_product', file)
        const response = axios.post(`${serverUrl}/api/admins/save-digital-product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true})
        return response
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const deleteDigitalFile = async (path:string) => {

    try {
        await axios.post(`${serverUrl}/api/admins/delete-digital-product`, {path: path}, {withCredentials: true})
        toast.info('deleted successfuly iykyk')
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const fetchProductsByKloset = async (kloset_id:number, type:KlosetType) => {

    try {
        const response = await axios.get(`${serverUrl}/api/admins/kloset/${kloset_id}&${type}/products`, {withCredentials: true})
        return response.data.products
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

interface fetchSingleProductProps{
    type: KlosetType,
    product_id: number
}

export const fetchSingleProduct = async (queryParams:fetchSingleProductProps) => {
    const {type, product_id} = queryParams

    try {
        const response = await axios.get(`${serverUrl}/api/admins/${product_id}&${type}`, {withCredentials: true})
        return response.data.product
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}