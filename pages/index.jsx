import Link from 'next/link'
import React from 'react'
import baseUrl from '../helpers/baseUrl'

export default function Home({products}) {  
  return (
    <div className="grid grid-cols-4 container py-5 gap-5">
      {products && products.map((item, index) => {
        return (
          <div key={index} className="border rounded shadow">
          <div className="relative h-52">
            <img src={item.mediaUrl} alt={item.name} className="h-full w-full object-cover " />
            <h1 className="absolute bottom-5 w-full left-0 text-center  text-3xl text-gray-900 capitalize font-medium">{item.name}</h1>
          </div>
          <div className="text-xl p-5 border-b">
           $.{item.price}
          </div>
          <div className="p-5">
            <Link href="/product/[id]" as={`product/${item._id}`} className="text-lg text-red-500">Product All Details</Link>
          </div>
        </div>
        )
      })}
      
    </div>
  )
}



export async function getStaticProps(context) {
  const res = await fetch(`${baseUrl}/api/mystore`)
  const data = await res.json()
  return {
    props: {
      products : data
    }, 
  }
}