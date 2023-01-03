import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'

export default function create() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [media, setMedia] = useState("")
  const [description, setDescription] = useState("")

  const [alert, setAlert] = useState("")

const submitHandle = async (e) => {
  e.preventDefault()
  const mediaUrl = await imageUpload()
  const res = await fetch(`${baseUrl}/api/store`, {
    method: "POST",
    headers : {
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
    setAlert(res2.error)
  } else{
    setAlert('data save')
  }
}

const imageUpload = async () => {
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
    <div className="max-w-lg mx-auto py-5">
      <form onSubmit={submitHandle}>
        <input name="name" type="text" placeholder='Product Name' className="w-full p-1 border rounded outline-none" value={name} onChange={(e) => setName(e.target.value)}  />
        <input name="price" type="number" placeholder='Price' className="w-full p-1 border rounded outline-none mt-5" value={price} onChange={(e) => setPrice(e.target.value)}  />
        <input accept='image/*' type="file" className="w-full p-1 border rounded outline-none mt-5" onChange={(e) => setMedia(e.target.files[0])}  />
        <img src={media ? URL.createObjectURL(media) : ""} alt="" />          
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" cols="30" rows="10" className="w-full p-1 border rounded outline-none mt-5"></textarea>
        {alert ? <p className="p-1 rounded text-lg text-black border bg-gray-300">{alert}</p> : ""}
        <button type='submit' className="w-full py-1 text-lg bg-gray-700 text-center text-white rounded">Submit</button>
      </form>
    </div>
  )
}
