import { useRouter } from 'next/router'
import React from 'react'
import {parseCookies} from 'nookies'


export default function Account() {
  const router = useRouter()
  return (
    <div>Account</div>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx)
  
  const token = cookie.token 
  if(!token){
    const {res} = ctx
    res.writeHead(302, {location : "/login"})
    res.end()
  }
  
  return {
    props: {}, // will be passed to the page component as props
  }
}