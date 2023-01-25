import mongoDbConnect from "../../../helper/mongoDbConnect";
import productModel from "../../../model/productModel";
mongoDbConnect()
export default async (req, res) => {
    switch (req.method) {
        case "GET":
                await getProduct(req, res)
                break;
        case "DELETE":
            await productDelete(req, res)
            break;            
    }
}

function queryMethod(iComponents) {
    return (req, res) => {
        const {pid} = req.query
        req.pid = pid
        return iComponents(req, res)
    }
   
}

const getProduct = queryMethod (async (req, res) => {       
       
           const data =  await productModel.findOne({_id:req.pid})
         res.status(200).json(data)
})

const productDelete = queryMethod (async (req, res) => {
   
    await productModel.findByIdAndDelete({_id: req.pid})
    res.status(200).json({message: 'product delete'})
}
)
