import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Navbar() {
  const router = useRouter()
  return (
    <header className="bg-black py-3">
        <nav className="container flex items-center justify-between">
            <Link href="/" className="text-3xl text-white">Logo</Link>
            <div className="flex items-center gap-5 text-lg font-medium">
                <Link href="/" className={router.pathname == '/' ? "text-white" : "text-[#ddd]"} >Home</Link>
                <Link href="/login" className={router.pathname == '/login' ? "text-white" : "text-[#ddd]"} >Login</Link>
                <Link href="/signup" className={router.pathname == '/signup' ? "text-white" : "text-[#ddd]"}>Signup</Link>
                <Link href="/create" className={router.pathname == '/create' ? "text-white" : "text-[#ddd]"}>Create</Link>
            </div>
        </nav>
    </header>
  )
}
