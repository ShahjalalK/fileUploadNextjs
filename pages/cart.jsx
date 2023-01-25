import React from 'react'
import basUrl from '../helper/baseUrl'
import {parseCookies} from 'nookies'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Cart({error}) {
  const router = useRouter()
  if(error){
    Cookies.remove('user')
    Cookies.remove('token')
    router.push("/login")
  }
  return (
    <div>Cart</div>
  )
}

export async function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx)
  if(!token){
    return {
      props: {product:[]},
    }
  }
  const res = await fetch(`${basUrl}/api/cart`, {
    headers : {
      "Authorization" : token + 123
    }
  })
  const product = await res.json()
console.log('product', product)
if(product.error){
  return {
    props: {error: product.error},
  }
}
  return {
    props: {product},
  }
}
