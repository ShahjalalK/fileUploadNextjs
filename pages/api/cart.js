import jwt from 'jsonwebtoken'
import cartModel from '../../model/cartModel';
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchProduct(req, res)
            break;
        case "PUT":
            await addToCart(req, res)
            break;

            case "DELETE":
            await removeProduct(req, res)
            break;
    }
}

function Authonticated(iComponents) {
    return (req, res) => {
        const {authorization} = req.headers
    if(!authorization){
        res.status(201).json({error : "You must Login"})
    }
    try{
        const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
        req.userId = userId
       return iComponents(req, res)
    }
    catch(error){
        res.status(201).json({error : "You must Login"})
    }
    }
}

const fetchProduct = Authonticated (async (req, res) => {
    const cart = await cartModel.findOne({user: req.userId}).populate("products.product")
    res.status(200).json(cart.products)
})

const addToCart = Authonticated (async (req, res) => {
    const { quantity, productId} = req.body
    const cart = await cartModel.findOne({user: req.userId})
   const pExixist = cart.products.some(podc => productId === podc.product.toString())
   if(pExixist){
        await cartModel.findOneAndUpdate({_id: cart._id, "products.product" : productId}, {
            $inc: {
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
    res.status(200).json({message : 'Add to cart'})
   }
    
})

const removeProduct = Authonticated (async (req, res) => {
        const {productId} = req.body
        const cart = await cartModel.findOneAndUpdate({user : req.userId}, {
            $pull : {
                products : {
                    product : productId
                }
            }
        },{
            new : true
        }).populate("products.product")
        res.status(200).json(cart.products)
})