'use client'
//import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import styles from './signup.module.css'
//import { Icon } from "@iconify/react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { signUpUser } from "@/api/User"
import AuthNav from "@/components/navbars/AuthNav"

const SignUp = () => {

  const router = useRouter()
  const { handleSubmit, register, formState: { errors }, reset} = useForm()
  //const [profilePicError, setProfilePicError] = useState('')
  //const [ppReview, setPPReview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({

    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasForbiddenChar: false

  })

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      await signUpUser(data)
      reset()
      router.push('/signin')
    } catch (error) {
      return error
    }
  
    setLoading(false)
    router.push('/signin')
  }

  /*const validateFile = (file) => {

    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']
    const maxSize = 2 * 1024 * 1024 //2mb

    if (file && !allowedFileTypes.includes(file.type)) {
      return 'Only png, jpg and gif formats are allowed'
    }
    if (file && file.size > maxSize) {
      return 'File must not be larger than 2MB'
    }
    return true
  }*/

  const validatePassword = (password) => {

    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*]/.test(password)
    const hasForbiddenChar = /[<>\\{}[\];()"']/.test(password)

    setPasswordStrength({ hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasForbiddenChar })

    if (hasForbiddenChar) {
      return 'Password contains forbidden characters'
    }

    return hasUpperCase && hasLowerCase && hasSpecialChar && hasNumber ? true : 'Password must contain numbers, special characters (!@#$%^&*), upper and lower case letters'
  }

  const handlePasswordChange = (e) => {
    const typedPassword = e.target.value
    validatePassword(typedPassword)
  }

  /*const onFileChange = (e) => {
    const file = e.target.files[0]
    const error = validateFile(file)
    setProfilePicError(error === true ? '' : error)

    if (file && error === true) {

      const reader = new FileReader()
      reader.onload = () => {
        setPPReview(reader.result)
      }
      reader.readAsDataURL(file)

    } else {
      setPPReview(null)
    }
  }*/

  return (
    <main>
      <AuthNav/>
      <ToastContainer/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input type="text" {...register('first_name', { required: 'First Name is required' })} />
          {errors.first_name && <span>{errors.first_name.message}</span>}
        </div>

        <div>
          <label>Surname</label>
          <input type="text" {...register('last_name', { required: 'Surname is required' })} />
          {errors.last_name && <span>{errors.last_name.message}</span>}
        </div>

        <div>
          <label>Username</label>
          <input type="text" {...register('username', { required: 'Username is required' })} />
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div>
          <label>Whatsapp Number</label>
          <input type="tel" {...register('whatsapp_number', { required: 'Whatsapp number required' })} />
          {errors.whatsapp_number && <span>{errors.whatsapp_number.message}</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email"
            {...register('email',
              { required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
              })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required', validate: validatePassword })}
            onChange={handlePasswordChange}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <ul>
            <li className={passwordStrength.hasUpperCase ? styles.valid : styles.invalid}>Has an uppercase letter</li>
            <li className={passwordStrength.hasLowerCase? styles.valid : styles.invalid}>Has a lowercase letter</li>
            <li className={passwordStrength.hasNumber ? styles.valid : styles.invalid}>Has a number</li>
            <li className={passwordStrength.hasSpecialChar ? styles.valid : styles.invalid}>Has a special character (!@#$%^&*)</li>
            {passwordStrength.hasForbiddenChar ? 
            <li className={styles.invalid}>Contains forbidden character</li> :
            <li></li>}
            
          </ul>
        </div>

        {/*<div>
          <label htmlFor="ppInput">
            Profile Picture
            <div className={styles.ppContainer}>
              {ppReview ?
                <Image src={ppReview} alt="Profile Preview" width={100} height={100} /> :
                <Icon icon="ic:outline-plus" style={{ color: '#070100' }} />
              }
            </div>
          </label>
          <input
            type="file"
            accept=".png, .jpg, .gif"
            {...register('profile_picture')}
            onChange={onFileChange} // Custom file handler
            style={{ display: 'none' }}
            id="ppInput"
          />
          {profilePicError && <span>{profilePicError}</span>}
        </div>*/}

        <button type="submit" disabled={loading === true}>{loading === true? 'Signing up...' : 'Sign up'}</button>
      </form>
      <article>
        <h3>Have an account?</h3>
        <Link href='/signin'>
          <button>Sign In</button>
        </Link>
      </article>
    </main>
  )
}
export default SignUp
