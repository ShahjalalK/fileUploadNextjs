import { useRouter } from 'next/router'
import React from 'react'
import baseUrl from '../../helpers/baseUrl'
import {parseCookies} from 'nookies'

export default function PorductId({product}) { 
  const router = useRouter()

  const cookie = parseCookies()

  const user = cookie.user ? JSON.parse(cookie.user) : ""
  
  const deleteHandle = async (id) => {
   await fetch(`${baseUrl}/api/product/${id}`, {
      method : "DELETE"
    })
    router.push('/')
  }
  return (
    <div className="max-w-3xl mx-auto py-5">

      {product && product.map((item, index) => {
        return(
          <div key={index} className="mx-auto">
            <img src={item.mediaUrl} alt={item.name} className="mx-auto" />
            <div className="text-center py-5 text-3xl">${item.price}</div>
            <div>{item.description}</div>
            <div className="py-5">
             {user.role === "admin" && user.role === "root" && <button className="px-5 py-1 bg-red-400 text-lg text-white rounded" onClick={() => deleteHandle(item._id)}>Delete</button>} 
            </div>
          </div>
        )
      })}

    </div>
  )
}


export async function getStaticProps({params:{id}}) {
    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json()
    return {
      props: {
        product : data
      }, // will be passed to the page component as props
    }
  }


  export async function getStaticPaths() {
    return {
      paths: [{ params: { id: '63b57576da4829f64c082b66' } }],
      fallback: true, // can also be true or 'blocking'
    }
  }