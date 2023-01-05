import { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'

export default function Signup() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [alert, setAlert]  = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await fetch(`${baseUrl}/api/signup`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const res2 = await res.json()
        if(res2.error){
            setAlert(res2.error)
        }else{
            setAlert(res2.message)
            router.push('/login')
        }

    }
  return (
    <div className="max-w-lg mx-auto py-5">
        <h1 className="text-center text-5xl font-medium">Signup Form</h1>
        <form className="shadow mt-5" onSubmit={submitHandler}>
            <input type="text" placeholder="Name" className="w-full border rounded p-1 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" className="w-full border rounded p-1 outline-none mt-5"  value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full border rounded p-1 outline-none mt-5"  value={password} onChange={(e) => setPassword(e.target.value)}/>
           {alert && <p className="p-2 bg-gray-300 text-gray-700 ">{alert}</p>  }
            <button className="w-full p-1 bg-gray-700 text-white text-lg mt-5">Sign Up</button>
        </form>
    </div>
  )
}
