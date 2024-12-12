import { Role, UserData } from "./Types"

export const storeUserData = (userData: UserData) => {
    
    localStorage.setItem('id', userData.id.toString())
    localStorage.setItem('username', userData.username)
    localStorage.setItem('firstName', userData.first_name)
    localStorage.setItem('profilePic', userData.profile_picture)
    localStorage.setItem('role', userData.role)
    localStorage.setItem('authenticated', String(userData.authenticated))
    localStorage.setItem('sessionStart', String(Date.now()))
}

export const loadUserData = () => {

        const id = localStorage.getItem('id')
        const username = localStorage.getItem('username')
        const first_name = localStorage.getItem('firstName')
        const profile_picture = localStorage.getItem('profilePic')
        const authenticated = localStorage.getItem('authenticated')
        const role = localStorage.getItem('role')
        
        if (!username || !first_name || !profile_picture || !authenticated || !role ||!id) {
            return null
        }

        const user = {
            id,
            username,
            first_name,
            profile_picture,
            authenticated: authenticated === 'true',
            role: role as Role,
        }
        return user
}

export const checkSessionValidity = ():boolean => {
    const sessionDuration = 20 * 24 * 60 * 60 * 1000 //30d
    const sessionStart = parseInt(localStorage.getItem('sessionStart')?? '0', 10)

    if(!sessionStart || (Date.now() - sessionStart) >= sessionDuration) {
        localStorage.clear()
        return false
    }
    return true
}

export const validateImages = (file: File): boolean|string => {

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