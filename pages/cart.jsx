import React, { useState } from 'react'
import {parseCookies} from 'nookies'
import baseUrl from '../helper/baseUrl'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Cart({error, products}) {
  const router = useRouter()
  const {token} = parseCookies()

  const [cProducts, setCPorducts] = useState(products)

  let price = 0

  const removeHandler =  async (pid) => {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json", 
        "Authorization" : token
      },
      body : JSON.stringify({
        productId : pid
      })
    })
    const res2 = await res.json()
    setCPorducts(res2)
  }
  if(error){
    Cookies.remove('token')
    Cookies.remove('user')
    router.push("/login")
  }
  if(!token){
    return(
      <div className="text-center flex justify-center items-center flex-col space-y-5 h-screen">
        <h1 className="text-5xl">Please Login and add to cart</h1>
        <button className="bg-gray-500 text-gray-50 px-5 py-1 text-sm" onClick={() => {router.push('/login')}}>Login Now</button>
      </div>
    )
  }
  return (
   <>
   
   <div>{cProducts.map((item, index) => {
      price = price + item.quantity * item.product.price
      return(
        <div className="max-w-5xl mx-auto py-5">
            <div className="flex items-center gap-2">
              <img src={item.product.mediaUrl} alt={item.product.name} className="w-32 border" />
              <div>
                <h6>{item.product.name}</h6>
                <h6>{item.quantity} X ${item.product.price}</h6>
                <button className="px-5 py-1 text-gray-50 bg-gray-500 text-sm" onClick={() => removeHandler(item.product._id)}>Remove</button>
              </div>
             
            </div>           
        </div>
      )
    })}</div>
    <div className="max-w-5xl mx-auto py-5">
         <hr />
     </div>
     <div className="max-w-5xl mx-auto flex justify-between items-center">
         <div>
          Total = ${price}
         </div>
         <button className="px-5 py-2 text-sm bg-gray-500 text-gray-50 rounded">CheckOut</button>
     </div>
   </>
  )
}

export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    return {
      props: {products : []}, // will be passed to the page component as props
    }
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
    headers : {
      "Authorization" : token
    }
  })
  const products = await res.json()
 if(products.error){
  return {
    props: {error : products.error}, // will be passed to the page component as props
  }
 }
  return {
    props: {products}, // will be passed to the page component as props
  }
}