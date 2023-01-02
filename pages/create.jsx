import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'

export default function Create() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [media, setMedia] = useState("")
  const [description, setDescription] = useState("")

  const [alert, setAlert] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const mediaUrl = await imageUpload()
    const res =  await fetch(`${baseUrl}/api/store`, {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name,
        price,
        mediaUrl,
        description
      })
      
    
    })

    const res2 = await res.json()
    if(res2.error){
      setAlert(res2.error)
    }else{
      setAlert("Save Data")
    }
  }

  const imageUpload = async () => {
    const data = new FormData()
    data.append('file', media);
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Name' className="w-full outline-none border p-1 rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" name="price" placeholder='Price' className="w-full outline-none border p-1 rounded mt-5" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="file" name="mediaUrl" className="w-full outline-none border p-1 rounded mt-5" accept="image/*" onChange={(e) => setMedia(e.target.files[0])} />
        <img src={media ? URL.createObjectURL(media) : ""} alt="media" />
        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="10" className="w-full outline-none mt-5 border p-1">        

        </textarea>
        {alert ? <p>{alert}</p> : ""}

        <button type='submit' className="mt-5 px-5 py-2 bg-gray-700 text-white rounded">Submit</button>
      </form>
    </div>
  )
}
