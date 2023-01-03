import Link from 'next/link'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState("")
  const router = useRouter()
  const loginHandler = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error){
      setAlert(res2.error)
    }else{
      Cookies.set('token', res2.token)
      router.push("/account")
    }
  }
  return (
    <div className="max-w-lg mx-auto py-5">
      <h1 className="text-center text-gray-700 text-5xl py-5">Login</h1>
      <form className="shadow" onSubmit={loginHandler}>      
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-1 border mt-5 rounded outline-none w-full" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-1 border mt-5 rounded outline-none w-full" />
     {alert ? <p className="p-1 text-lg bg-gray-300 text-gray-600 mt-5 rounded">Email or password dont match</p> : ""} 
     <div className="py-5 flex flex-col spapcing-y-3">
     <button type='submit' className="bg-gray-700 text-lg rounded w-full text-center py-1 text-white ">Login</button>
     <Link href="/signup" className="text-center text-2xl font-medium mt-5">Create an account</Link>
     </div>
      </form>
    </div>
  )
}

