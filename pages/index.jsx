import Link from 'next/link'
import React from 'react'
import baseUrl from '../helper/baseUrl'

export default function Home({products}) {  
  return (
    <div className="grid grid-cols-5 container gap-5 py-5">
      {products && products.map((item, index) => {
        return(
          <div key={index} className="border rounded overflow-hidden">
          <div className="relative h-52 overflow-hidden">
            <img src={item.mediaUrl} alt={item.name} className="h-full w-full object-cover" />
            <h1 className="absolute bottom-5 text-center w-full text-white text-2xl shadow">{item.name}</h1>
          </div>
          <div className="text-xl font-bold p-5 border-b text-center">
            {item.price}
          </div>
          <div className="p-5 text-center">
           <Link href="/product/[id]" as={`/product/${item._id}`} className="text-gray-600">Product Details</Link>
          </div>
        </div>
        )
      
      })}
    </div>
  )
}



export async function getStaticProps(context) {
  const res = await fetch(`${baseUrl}/api/products`)
  const data = await res.json()
  return {
    props: {
      products : data
    }, // will be passed to the page component as props
  }
}