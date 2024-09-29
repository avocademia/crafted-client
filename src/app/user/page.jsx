'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import styles from './user.module.css'
import Link from "next/link"
import { loadUserData, checkSessionValidity } from "@/Helpers"
import { signOutUser } from "@/api/User"
import UserNav from "@/components/navbars/UserNav"

const User = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [user, setUser] = useState(null) // Initialize as null to check loading state
  const router = useRouter()

  const signout = () => {
    signOutUser()
    router.push('/')
  }

  useEffect(() => {
    setIsMounted(true)
    const sessionIsValid = checkSessionValidity()
    console.log(sessionIsValid)
    
    if (!sessionIsValid) {
      router.push('/signin')
      toast.error('You must sign in to access this page', { hideProgressBar: true })
      return
    }

    const userData = loadUserData()
    console.log('user data',userData)
    if (userData) {
      setUser(userData)
    } else {
      router.push('/signin')
      toast.error('User data not found', { hideProgressBar: true })
    }

    console.log('user',user)

  }, [router])

  // Prevent render until user data is loaded
  if (!isMounted || !user) return <p>Loading...</p>

  return (
    <section>
      <UserNav/>
        <main>
          <article className={styles.userDetails}>
            <h1>Hi, {user.firstName}</h1>
            <Image src={`/user.png`} width={80} height={80} alt="Profile picture" />
            <h3>@{user.username}</h3>
          </article>
          <article>
            <Link href='/user/orders'>
              <button>Orders</button>
            </Link>
            <Link href='/user/reviews'>
              <button>Reviews</button>
            </Link>
            <Link href='/user/settings'>
              <button>Settings</button>
            </Link>
            <button onClick={signout}>Log Out</button>
          </article>
        </main>
        <ToastContainer/>
    </section>
  )
}

export default User
