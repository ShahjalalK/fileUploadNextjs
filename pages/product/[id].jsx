import React from 'react'
import baseUrl from '../../helper/baseUrl'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { useRouter } from 'next/router'
import {parseCookies} from 'nookies'
import { useState } from 'react'

export default function productId({product}) {    
    const router = useRouter()
    const cookie = parseCookies()
   const user = cookie.user ? JSON.parse(cookie.user) : ""
   const [quantity, setQuantity] = useState(1)
   const deleteHandler = async () => {
    await fetch(`${baseUrl}/api/products/${product._id}`, {
        method : "DELETE"       
    })
    router.push("/")
   }
   const addToCart = async () => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : cookie.token
      },
      body : JSON.stringify({
        quantity,
        productId: product._id
      })
    })
    const res2 = await res.json()
    alert(quantity)
   }
  return (
    <div className="max-w-7xl mx-auto py-5">
        <div className="max-w-sm mx-auto">
            <img src={product.mediaUrl} alt="" className="w-full" />
            <div className="text-xl text-gray-500 font-bold pt-3">${product.price}</div> 
           
            
            <div className="flex items-center"><input min="1" value={quantity} onChange={(e) => Number(setQuantity(e.target.value))} type="number" className="w-full p-1 border rounded outline-none my-5" /> 
            
            {user ? <button type="button" className="text-gray-500 text-2xl" onClick={addToCart}><AiOutlinePlusCircle /></button> : 
            <button type="button" className="text-xs bg-gray-500 text-white" onClick={() => {router.push('/login')}}>Login Now</button>}             
            
            </div> 
                         
        </div>        
        <div>{product.description}</div>
        {user.user === 'admin' && user.user === 'root' && 
        
        <div className="text-center"><button className="bg-red-500 text-white px-7 py-1 rounded text-lg" onClick={deleteHandler}>Delete</button></div>
        
        }
        
    </div>
  )
}


export async function getServerSideProps({params}) {
    const id = params.id
    const res = await fetch(`${baseUrl}/api/products/${id}`)
    const product = await res.json()
    return {
      props: {
        product
      }, // will be passed to the page component as props
    }
  }