exports.test = async(req,res)=>{
    try{

        return res.status(200).json({
            message:"test successfull"
        })

    }catch(err){
        return res.json({
            message:'error occured'
        })
    }
}