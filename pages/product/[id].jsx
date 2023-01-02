import { useRouter } from 'next/router'
import React, { useState } from 'react'
import baseUrl from '../../helpers/baseUrl'

export default function ProductId({product}) {
    const [model, setModel] = useState(false)
    const router = useRouter()
    const deleteProduct = async (id) => {
       const res = await fetch(`${baseUrl}/api/product/${id}`, {
            method : "DELETE"
        })
        await res.json()
        router.push("/")

    }
  return (
    <div className="max-w-3xl mx-auto py-5">
        {product && product.map((item, index) => {
            return(
                <>
                <div key={index}>
                    <h1 className="text-5xl mb-5">{item.name}</h1>
                    <img src={item.mediaUrl} alt={item.name} />
                    <h3 className="text-5xl py-5">TK.{item.price}</h3>
                    <div>{item.description}</div>
                    <button onClick={() => setModel(!model)} className="text-lg px-7 py-1 bg-red-500 text-white rounded my-5 text-center">Delete</button>
                </div>
                <div className={model ? "model active" : "model"} >
                    <div className="bg-white rounded p-10 text-center">
                        <h1 className="text-3xl">{item.name}</h1>
                        <p className="text-lg">Are you sure! wont you this product delete</p>
                        <div className="flex items-center gap-1">
                        <button onClick={() => deleteProduct(item._id)}  className="text-lg px-7 py-1 bg-red-500 text-white rounded my-5 text-center">Delete</button>
                        <button onClick={() => setModel(!model)} className="text-xl px-5 py-1 rounded border">Close</button>
                        </div>
                    </div>
                </div>
               </>
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
      paths: [{ params: { id: '63afc580e48bca2dcc413ed2' } }],
      fallback: true, // can also be true or 'blocking'
    }
  }