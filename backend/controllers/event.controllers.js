const postEventController = async(req,res) =>{
    try
        {
            
        }
    catch(err)
        {
            res.status(500).json({message:"something went wrong",error:err.message})
        }
}