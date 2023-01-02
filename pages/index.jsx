import Link from 'next/link'
import React from 'react'
import baseUrl from '../helpers/baseUrl'

export default function index({products}) { 
  return (
    <div className="grid grid-cols-4 gap-5 py-5 container">
      {products && products.map((item, index) => {
        return(
          <div className="border rounded overflow-hidden" key={index}>
            <div className="relative">
              <img src={item.mediaUrl} alt="media" />
              <h1 className="absolute bottom-5 left-[50%] -translate-x-16 text-xl shadow text-lime-100">{item.name}</h1>
            </div>
            <div className="p-5 text-xl border-b">
              ${item.price}
            </div>
            <div className="p-5">
              <Link className="text-lg text-orange-500" href="/product/[id]" as={`/product/${item._id}`}>Product All Details</Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}


export async function getStaticProps(context) {
  const res = await fetch(`${baseUrl}/api/store`)
  const data = await res.json()
  return {
    props: {
      products : data
    }, // will be passed to the page component as props
  }
}