import jwt from "jsonwebtoken";
import cartModel from "../../model/cartModel";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchProduct(req, res);
      break;
    case "PUT":
      await addToCart(req, res);
      break;
  }

};


function Authonticated(iComponents) {
    return (req, res) => {
        const { authorization } = req.headers;
        if (!authorization) {
          return res.status(201).json({ error: "You must log in" });
        }
        try {
          const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
          req.userId = userId
          return iComponents(req, res)
          
        } catch (error) {
          return res.status(201).json({ error: "You must log in" });
        }
    }
}


const fetchProduct = Authonticated (async (req, res) => {
    const cart = await cartModel.findOne({ user: req.userId });
          return res.status(200).json(cart.products);
})

const addToCart = Authonticated (async (req, res) => {
    const {quantity, productId} = req.body
    const cart = await cartModel.findOne({ user: req.userId });
   const pExixts = cart.products.some(pdoc => productId === pdoc.product.toString())

    if(pExixts){
        await cartModel.findOneAndUpdate({_id: cart._id, "products.product" : productId}, {
            $inc : {
                "products.$.quantity" : quantity
            }
        })
    }else{
        const newProduct = {quantity, product: productId}
        await cartModel.findOneAndUpdate({_id: cart._id}, {
            $push : {
                products : newProduct
            }
        })
    }
          return res.status(200).json({message: "product add to cart"});
})