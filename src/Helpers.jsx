export const storeUserData = (userData) => {
    localStorage.setItem('userId', userData.id)
    localStorage.setItem('username', userData.username)
    localStorage.setItem('firstName', userData.first_name)
    localStorage.setItem('profilePic', userData.profile_picture)
    localStorage.setItem('role', userData.role)
    localStorage.setItem('authenticated', userData.authenticated)
    localStorage.setItem('sessionStart', Date.now())
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

export const checkSessionValidity = () => {
    const sessionDuration = 20 * 24 * 60 * 60 * 1000 //30d
    const sessionStart = localStorage.getItem('sessionStart')

    if(!sessionStart || (Date.now() - sessionStart) >= sessionDuration) {
        localStorage.clear()
        return false
    }
    return true
}

export const validateImages = (file) => {

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