import React from 'react'
import {parseCookies} from 'nookies'

export default function Account() {
  return (
    <div>Account</div>
  )
}



export async function getServerSideProps(ctx) {
    const {token} = parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302, {location : "/login"})
        res.end()
    }


    return {
      props: {}, // will be passed to the page component as props
    }
  }