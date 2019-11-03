
const user ={
    _id:"1",
    name:"Treek",
    email:"nbatre1@yahoo.com",
    picture:"http://cloudinary.com/asdf"
    
}

module.exports ={

     Query:{
         me:() => user
     }


}