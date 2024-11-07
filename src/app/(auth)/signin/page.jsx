'use client'
import styles from './signin.module.css'
import {toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signInUser } from "@/api/User"
import { storeUserData } from "@/Helpers"
import Link from "next/link"
import AuthNav from '@/components/navbars/AuthNav'
import { Icon } from '@iconify/react'

const SignIn = () => {
  const {handleSubmit, register, formState: {errors}, reset} = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data) => {

    setLoading(true)
    try {
  
      const userData = await signInUser(data)
      storeUserData(userData)
      router.push('/')
      reset()
  
    } catch (error) {
      toast.error('unexpected error occured logging in')
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
            {errors.identifier && <span>{errors.identifier}</span>} 
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