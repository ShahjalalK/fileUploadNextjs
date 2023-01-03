import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const signupHandler = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/signup`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,
        email,
        password
      })
    })
    const res2 = await res.json()
    if(res2.error){
      alert(res2.error)
    }else{
      alert(res2.message)
      router.push('/login')
    }
  }
  return (
    <div className="max-w-lg mx-auto py-5">
      <h1 className="text-center text-gray-700 text-5xl py-5">Signup</h1>
      <form className="shadow" onSubmit={signupHandler}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="p-1 border rounded outline-none w-full" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-1 border mt-5 rounded outline-none w-full" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-1 border mt-5 rounded outline-none w-full" />
     <div className="py-5 flex flex-col spapcing-y-3">
     <button type='submit' className="bg-gray-700 text-lg rounded w-full text-center py-1 text-white ">Sign Up</button>
     <Link href="/login" className="text-center text-2xl font-medium mt-5">I have a account</Link>
     </div>
      </form>
    </div>
  )
}
