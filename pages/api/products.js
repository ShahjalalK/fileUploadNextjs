import mongoDbConnect from "../../helper/mongoDbConnect"
import productModel from "../../model/productModel";

mongoDbConnect()

export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
          await getProduct(req, res)
        break;
        case "POST":
          await postProduct(req, res)
        break;
          
    }
  }


  const getProduct = async (req, res) => {
      await productModel.find().then((products) => {
       return  res.status(200).json(products)
      })
  }

  const postProduct = async(req, res) => {
    try{
      const {name, price, mediaUrl, description} = req.body
      if(!name || !price || !mediaUrl || !description){
        return  res.status(422).json({error : "Please all full fill"})
      }
      const newProduct = new productModel({
        name,
        price,
        mediaUrl,
        description
      })

      await newProduct.save()

      return  res.status(200).json({success : "Sucess Fully Add The Book"})

    }
    catch(error){
      console.log(error)
      console.log("Your Post Problems")
      process.exit(1)
    }
  }