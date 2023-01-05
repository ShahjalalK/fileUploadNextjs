import { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import cookie from 'js-cookie'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const submitHandler = async (e) => {
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
    alert(res2.error)
  }else{
    cookie.set('token', res2.token)
    cookie.set('user', JSON.stringify(res2.user))
    router.push('/account')
  }
}
  return (
    <div className="max-w-lg mx-auto py-5">
      <h1 className="text-5xl text-center mb-5">Login Form</h1>
      <form className="shadow" onSubmit={submitHandler}>
        <input type="email" placeholder='Email' className="w-full p-1 border rounded outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className="w-full p-1 border rounded outline-none mt-5" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full p-1 text-lg rounded bg-gray-700 text-white mt-5">Login</button>
      </form>
    </div>
  )
}
