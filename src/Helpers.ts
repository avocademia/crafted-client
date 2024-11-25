import { User } from "./Types"

export const storeUserData = (userData: User) => {
    
    localStorage.setItem('userId', String(userData.id))
    localStorage.setItem('username', userData.username)
    localStorage.setItem('firstName', userData.first_name)
    localStorage.setItem('profilePic', userData.profile_picture)
    localStorage.setItem('role', userData.role)
    localStorage.setItem('authenticated', String(userData.authenticated))
    localStorage.setItem('sessionStart', String(Date.now()))
}

export const loadUserData = () => {
        const userId = localStorage.getItem('userId')
        const username = localStorage.getItem('username')
        const firstName = localStorage.getItem('firstName')
        const profilePic = localStorage.getItem('profilePic')
        const userAuthenticated = localStorage.getItem('authenticated')
        const userRole = localStorage.getItem('role')

        const user = {
            userId,
            username,
            firstName,
            profilePic,
            userAuthenticated,
            userRole
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