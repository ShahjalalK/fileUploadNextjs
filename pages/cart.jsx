import React from 'react'
import {parseCookies} from 'nookies'
import baseUrl from '../helper/baseUrl'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Cart({error}) {
  const router = useRouter()
  if(error){
    Cookies.remove('token')
    Cookies.remove('user')
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
      props: {products : []}, // will be passed to the page component as props
    }
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
    headers : {
      "Authorization" : token + '123'
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