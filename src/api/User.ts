import axios from "axios"
import { toast } from "react-toastify"
import { SigninData,ErrorData, SignupData, UserData } from "../Types"
import { error } from "console"
const environment = process.env.NEXT_PUBLIC_NODE_ENV
const prodUrl = process.env.NEXT_PUBLIC_PROD_SERVER_URL
const devUrl = process.env.NEXT_PUBLIC_DEV_SERVER_URL

export const signInUser = async (data: SigninData) => {

    try {
        const response = await axios.post(`${environment === 'production'? prodUrl:devUrl}/api/users/signin`,
                                            data, 
                                           {withCredentials: true}
                                         )
        const user:UserData = response.data.user
        return user  
    } catch (error:ErrorData) {
        toast.error(error.response.data.error)
    }
}

export const signUpUser = async (data: SignupData) => {
    try {   

        /*const formData = new FormData()

        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('username', data.username)
        formData.append('whatsapp_number', data.whatsapp_number)
        formData.append('email', data.email)
        formData.append('password', data.password)
    
        if (data.profile_picture && data.profile_picture[0]) {
          formData.append('profile_picture', data.profile_picture[0])
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }*/
        await axios.post(`${environment === 'production'? prodUrl:devUrl}/api/users/signup`, data)
        toast.info('Account succesfully created', {hideProgressBar: true})
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const signOutUser = async () => {

    try {
        localStorage.clear()
        await axios.post(`${environment === 'production'? prodUrl:devUrl}/api/users/signout`,{}, {withCredentials: true})
    } catch (error:ErrorData) {
        toast.error(error.response.data.error, {hideProgressBar: true})
    }
}

export const followKloset = async (klosetId:number) => {

    try {
        await axios.post(`${environment === 'production'?prodUrl:devUrl}/api/users/follow`,{kloset_id: klosetId}, {
            withCredentials: true
        })
        return
    } catch (error:ErrorData){
        toast.error(error.response.data.error)
    }
}