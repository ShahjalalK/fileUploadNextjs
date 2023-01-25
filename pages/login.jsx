import { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../helper/baseUrl'
import cookie from 'js-cookie'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [alert, setAlert] = useState("")
  const submitHandler = async (e) =>{
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
      setAlert(res2.message)
      cookie.set('token', res2.token)
      cookie.set('user', JSON.stringify(res2.user))
      router.push("/account")
    }
  }

  return (
    <div className="max-w-lg mx-auto py-5">
      <h1 className="py-5 text-3xl text-center uppercase">Login</h1>
      <form className="shadow" onSubmit={submitHandler}>
        <input type="email" placeholder="Email" className="w-full outline-none p-1 border rounded " value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="Password" placeholder="Password" className="w-full outline-none p-1 border rounded mt-5" value={password} onChange={(e) => setPassword(e.target.value)} />
        {alert && <p className="border p-1 text-gray-500 bg-gray-100 mt-5">{alert}</p>}  
        <button type='submit' className="w-full bg-gray-500 text-black text-lg text-center p-1 mt-5 font-medium rounded">Submit</button>
      </form>
    </div>
  )
}
