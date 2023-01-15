import React, { useState } from 'react'
import baseUrl from '../helper/baseUrl'
import {parseCookies} from 'nookies'

export default function Create() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [media, setMedia] = useState()
  const [description, setDescription] = useState()

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const mediaUrl = await uploadUrl()

    const res = await fetch(`${baseUrl}/api/products`, {
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        mediaUrl,
        description
      })
    })

    const res2 = await res.json()

    if(res2.error){
      alert(res2.error)
    }else{
      alert(res2.success)
    }

  }

  const uploadUrl = async () => {
    const data = new FormData()
    data.append('file', media)
    data.append('upload_preset', 'mystore')
    data.append('cloud_name', 'dfgnwxo3b')
    const res = await fetch('https://api.cloudinary.com/v1_1/dfgnwxo3b/image/upload', {
      method : "POST",
      body : data
    })
    const res2 = await res.json()
    return res2.url
  }

  return (
    <div className="max-w-lg mx-auto my-5">
      <h1 className="text-3xl text-center py-5 uppercase">Create Product</h1>
      <form className="shadow" onSubmit={submitHandler}>
        <input type="text" placeholder='Book Name' className="border outline-none rounded w-full p-1 " value={name} onChange={(e) => setName(e.target.value)}  />       
        <input type="number" placeholder='Price' className="border outline-none rounded w-full p-1 mt-5"  value={price} onChange={(e) => setPrice(e.target.value)} /> 
        <input type="file" className="border outline-none rounded w-full p-1 mt-5" accept='image/*' onChange={(e) => setMedia(e.target.files[0])}/>       
         <img src={ media ? URL.createObjectURL(media) : ""} alt="" />      
        <textarea rows="7" cols="7" placeholder='Description' className="border outline-none rounded w-full p-1 mt-5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button className='px-7 py-2 bg-gray-500 text-black w-full rounded mt-5 text-lg font-medium' type='submit'>Submit</button>
      </form>
    </div>
  )
}


export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx)
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  if(user.role !== 'admin'){
    const {res} = ctx
    res.writeHead(302, {location : "/"})
    res.end()
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}