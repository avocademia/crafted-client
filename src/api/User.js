import axios from "axios"
import { toast } from "react-toastify"
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const signInUser = async (data) => {

    try {
        const response = await axios.post(`${serverUrl}/api/users/signin`,
                                            data, 
                                           {withCredentials: true}
                                         )
        const user = response.data.user
        return user  
    } catch (error) {
        const err =error.response.data.message
        toast.error(err, {hideProgressBar: true})
        return err
    }
}

export const signUpUser = async (data) => {
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
        await axios.post(`${serverUrl}/api/users/signup`, data)
        toast.info('Account succesfully created', {hideProgressBar: true})
    } catch (error) {
        toast.error('An error occured pleasr try again later')
    }
}

export const signOutUser = async () => {

    try {
        localStorage.clear()
        await axios.post(`${serverUrl}/api/users/signout`,{}, {withCredentials: true})
    } catch (error) {
        toast.error('An error occured signing out. Please let us know if it happens again')
    }
}