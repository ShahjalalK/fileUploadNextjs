import mongoDbConnect from "../../helpers/mongoDbConnect"
import productModel from "../../model/productModel"


mongoDbConnect()



export default async function handler(req, res) {
    try{
        switch (req.method) {
            case "GET":
                await getAllProduct(req, res)
                break; 

            case "POST":
                await postAllProduct(req, res)
                break;        
            
        }
        
    }
    catch(error){
        console.log(error)
        console.log("Server error")
        process.exit(1)
    }
    
  }


  const getAllProduct = async (req, res) => {
    try{
       const data = await productModel.find().sort({price:"1"})
       res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        console.log("Product get error")
        process.exit(1)
    }
  }


  const postAllProduct = async (req, res) => {
    try{
        const {name, price, mediaUrl, description} = req.body
        if(!name || !price || !mediaUrl || !description){
            return res.status(422).json({error : "Fill all the boxes"})
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


