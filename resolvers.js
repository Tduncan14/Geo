
const{AuthenticationError } = require('apollo-server');




const authenicated = next => (root,args,ctx,info) =>{


    if(!ctx.currentUser){

        throw new AuthenticationError(`You must be logged in`)
    }

    return next(root,args,ctx,info)
}


module.exports ={

     Query:{
         me:authenicated((root,args,ctx,info) =>ctx.currentUser)
     }


}