import Link from 'next/link'
import { useRouter } from 'next/router'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'

export default function Navbar() {
    const router = useRouter()
    const userCookie = parseCookies() 
    const user = userCookie.user ? JSON.parse(userCookie.user) : ""
    console.log(user)
  return (
    <header className={router.asPath == "/" ? "bg-black text-gray-300 p-3" : "bg-black text-gray-500 p-3"} >
        <div className="flex items-center justify-between container">
        <Link href="/" className="text-5xl uppercase font-bold">Logo.</Link>
       
        
        <div className="flex items-center gap-2">
       {user.role === 'admin' && user.role === 'root' && <><Link href="/create" className={router.asPath == "/create" ? "navLink active" : "navLink"} >Create</Link></>} 
       {user.role === 'user' ? 
            <>
            <Link href="/cart" className={router.asPath == "/cart" ? "navLink active" : "navLink"} >Cart</Link>
            <Link href="/account" className={router.asPath == "/account" ? "navLink active" : "navLink"} >Account</Link>
            <button className="bg-gray-300 text-blue-500 font-bold text-lg px-5 py-1 rounded" onClick={() => {
             Cookies.remove('token')
             Cookies.remove('user')
             router.push('/login')
            }}>Logout</button>
            </>
       
        :

        <>
        <Link href="/cart" className={router.asPath == "/cart" ? "navLink active" : "navLink"} >Cart</Link>
          <Link href="/login" className={router.asPath == "/login" ? "navLink active" : "navLink"} >Login</Link>
            <Link href="/signup" className={router.asPath == "/signup" ? "navLink active" : "navLink"}>Signup</Link>
        </>
        
            
        
        
        }
        </div>
        
    </div>
    </header>
  )
}
