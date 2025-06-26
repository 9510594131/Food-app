const testusercontroller = (req,res)=>{
    try{
        res.status(200).json({
            message: "Test user controller is working",
            sucess: true
        });  
    }
    catch(err){
        console.error(err);
    }
}

module.exports = {testusercontroller}