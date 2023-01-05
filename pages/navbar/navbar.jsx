import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'


export default function Navbar() {
  const router = useRouter()
  const userCookies = parseCookies()

  const user = userCookies.user ? JSON.parse(userCookies.user) : ""

  return (
    <header className="bg-black py-3">
        <nav className="container flex items-center justify-between">
            <Link href="/" className="text-3xl text-white">Logo</Link>
            
          {user ? 
          
          <div className="flex items-center gap-5 text-lg font-medium">
            
          {user.role === "admin" && user.role === "root" &&  <Link href="/create" className={router.pathname == '/create' ? "text-white" : "text-[#ddd]"} >Create</Link>}
             
                  <Link href="/account" className={router.pathname == '/account' ? "text-white" : "text-[#ddd]"} >Account</Link>
             <button className="px-5 py-1 text-white bg-blue-700" onClick={() => {
                Cookies.remove('user')
                Cookies.remove('token')
                router.push("/login")
             }}>Logout</button>
             
          </div>

          :


          <div className="flex items-center gap-5 text-lg font-medium">
            
        
          <Link href="/login" className={router.pathname == '/login' ? "text-white" : "text-[#ddd]"} >Login</Link>
          <Link href="/signup" className={router.pathname == '/signup' ? "text-white" : "text-[#ddd]"}>Signup</Link>
      
      </div>
        
        
        }
            
            

           


            
          
      
            
            

     
        </nav>
    </header>
  )
}
