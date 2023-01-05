import MongoDbConnect from "../../helpers/mongoDbConnect"
import productModel from "../../models/productModel";

MongoDbConnect()

export default async function handler(req, res) {
    try{
        switch (req.method) {
            case "POST":
                await postProduct(req, res)
                break; 

            case "GET":
                await getProduct(req, res)
                break;         
            
        }
    }
    catch(error){
        console.log(error)
        console.log("Server error")
        process.exit(1)
    }
  }


  const postProduct = async (req, res) => {
    try{
        let {name, price, mediaUrl, description} = req.body
        if(!name || !price || !mediaUrl || !description){
            return res.status(422).json({error : "Please fill out all field"}) 
        }
        const newProduct = new productModel({
            name,
            price,
            mediaUrl,
            description
        })
        await newProduct.save()
       return res.status(200).json(newProduct)
    }
    catch(error){
        console.log(error)
        console.log("Product post error")
        process.exit(1)

    }
  }

  const getProduct = async (req, res) => {
    try{
       const data = await productModel.find()
      return  res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        console.log("Product get error")
        process.exit(1)

    }
  }