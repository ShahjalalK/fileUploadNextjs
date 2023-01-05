import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'

export default function Create() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [meida, setMedia] = useState("")
    const [description, setDescription] = useState("")

    const [alert, setAlert] = useState("")
    const submitHandler = async (e) => {
        e.preventDefault()
        const mediaUrl = await imageUpload()
        const res = await fetch(`${baseUrl}/api/mystore`, {
            method : "POST",
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
            setAlert('Product save')
        }
    }


    const imageUpload = async () => {
        const data = new FormData()
        data.append('file', meida)
        data.append('upload_preset', 'mystore')
        data.append('cloud_name', 'dfgnwxo3b')
        const res = await fetch('https://api.cloudinary.com/v1_1/dfgnwxo3b/image/upload', {
            method : "POST",
            body : data
        })
        const res2 = await res.json()
        console.log(res2.url)
        return res2.url
    }
  return (
    <div className="max-w-lg mx-auto py-5">
        <h1 className="text-5xl text-center mb-5">Product Add</h1>
        <form className="shadow" onSubmit={submitHandler}>
            <input type="text" placeholder='Name' value={name} className="w-full border rounded outline-none p-1" onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder='Price' value={price} className="w-full border rounded outline-none p-1 mt-5" onChange={(e) => setPrice(e.target.value)}  />
            <input type="file" accept='image/*' className="w-full border rounded outline-none p-1 mt-5" onChange={(e) => setMedia(e.target.files[0])}  />
            <img src={meida ? URL.createObjectURL(meida) : "" } alt="" />

            <textarea cols="30" rows="10" value={description} className="w-full border rounded outline-none p-1 mt-5" onChange={(e) => setDescription(e.target.value)}>
            </textarea>
           {alert && <p className="p-2 bg-gray-300 text-gray-700 ">{alert}</p>} 
            <button className="w-full bg-gray-700 text-white p-2 mt-5 rounded">Add Product</button>
        </form>
    </div>
  )
}
