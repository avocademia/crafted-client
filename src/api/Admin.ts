import axios from "axios"
import { toast } from "react-toastify"
import { ErrorData, KlosetData, KlosetFormData, KlosetType, ProductFormData, Role } from "../Types"
const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

export const fetchUsers = async () => {

    try {
        const response = await axios.get(`${environment === 'production'?prodUrl:devUrl}/api/admins/fetch-users`, {withCredentials: true})
        return response.data.users
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const changeRole = async (data:Role) => {

    try {
        await axios.post(`${environment === 'production'? prodUrl:devUrl}/api/admins/change-role`, data, {withCredentials: true})
        toast.info('Role change successful', {hideProgressBar: true})
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}