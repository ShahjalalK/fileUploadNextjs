import productModel from "../../../model/productModel";
export default async (req, res) => {
    try{
        switch (req.method) {
            case "GET":
                await findProduct(req, res)
                break;

            case "DELETE":
                await deleteProduct(req, res)
                break;
        }
    }
    catch(error){
        console.log(error)
        console.log("product error")
        process.exit(1)
    }
}


const findProduct = async (req, res) => {
    try{
        const {pid} = req.query
       await productModel.find({_id:pid}).then((product) => {
        res.status(200).json(product)
       })
      
    }
    catch(error){
        console.log(error)
        console.log("product find error")
        process.exit(1)
    }
}

const deleteProduct = async (req, res) => {
    try{
        const {pid} = req.query
       await productModel.findByIdAndDelete({_id:pid})
       res.status(200).json({})

      
      
    }
    catch(error){
        console.log(error)
        console.log("product delete error")
        process.exit(1)
    }
}