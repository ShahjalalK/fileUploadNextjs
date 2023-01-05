import productModel from '../../../models/productModel'
export default async (req, res) => {
    try{
        switch (req.method) {
            case "GET":
                await productFind(req, res)
                break;
            case "DELETE":
                await productDelete(req, res)
                break;
        
        }

    }
    catch(error){
        console.log(error)
        console.log('pid error')
        process.exit(1)

    }
}

const productFind = async (req, res) => {
    const {pid} = req.query
    await productModel.find({_id : pid}).then((product) => {
        res.status(200).json(product)
    })
   
}

const productDelete = async (req, res) => {
    const {pid} = req.query
    await productModel.findByIdAndDelete({_id : pid})

   res.status(200).json({message: "product deleted"})
}