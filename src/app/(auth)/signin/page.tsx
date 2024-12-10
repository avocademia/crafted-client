'use client'
import styles from './signin.module.scss'
import {toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signInUser } from '../../../api/User'
import { storeUserData } from '../../../Helpers'
import Link from "next/link"
import AuthNav from '../../../components/navbars/AuthNav'
import { Icon } from '@iconify/react'
import { SigninData } from '../../../Types'

const SignIn = () => {
  const {handleSubmit, register, formState: {errors}, reset} = useForm<SigninData>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: SigninData) => {

    setLoading(true)
    try {
  
      const userData = await signInUser(data)
      if (userData) {
        storeUserData(userData)
        router.push('/')
        reset()
      }

    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }  

  const handlePasswordShow = () => {
    if (!showPassword) {
      setShowPassword(true)
    } else [
      setShowPassword(false)
    ]
  }

  return (
    <main>
      <AuthNav/>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fieldContainer}>
            <label>email/username</label>
            <input type="text" {...register('identifier', {required: 'email or username is required'})} />
            {errors.identifier && typeof errors.identifier.message === 'string' && (
              <span>{errors.identifier.message}</span>
            )}
          </div>
          <div className={styles.fieldContainer}>
            <label>password</label>
            <div className={styles.passwordContainer}>
              <input type={showPassword? "text": "password"} {...register('password', {required: 'password is required'})}/>
              <button type="button" onClick={handlePasswordShow}>
                {showPassword? <Icon  icon="streamline:eye-optic"/> :
                 <Icon icon="ph:eye-closed-bold" />}</button>
            </div>
          </div>
          <button className={styles.submitBtn} type="submit" disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
      <div className={styles.redirectContainer}>
        <h4>Don't have an account?</h4>
        <Link href='/signup'>
          <button className={styles.signUBtn}>Sign Up</button>
        </Link>
        <Link href='/forgot-password' className={styles.forgotPswrd}>Forgot Password?</Link>
      </div>
      <ToastContainer/>
    </main>
  )
}
export default SignIn