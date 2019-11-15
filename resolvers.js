
const{AuthenticationError } = require('apollo-server');
const Pin = require('./models/Pin');



const authenicated = next => (root,args,ctx,info) =>{


    if(!ctx.currentUser){

        throw new AuthenticationError(`You must be logged in`)
    }

    return next(root,args,ctx,info)
}


module.exports ={

     Query:{
         me:authenicated((root,args,ctx,info) =>ctx.currentUser)
     },

     Mutation:{
         CreatePin: authenticated(async (root,args,ctx) => {
         const newPin = await new Pin({
                ...args.input,
                author:ctx.currentUser._id
            }).save()
           const pinAdded = await Pin.populate(newPin, 'author')

           return pinAdded
         })
     }


}