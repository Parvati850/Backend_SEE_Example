import mongoose from 'mongoose'

const ecommerceSchema = mongoose.Schema({
    name:{type:String,
          required:true
    },
    category:{type:String,
          required:true
    },
    price:{type:Number,
          required:true
    },
    stockQuantity:{type:Number,
          required:true
    },
    description:{type:String,
          required:true
    }
})

const ecommerceModel = mongoose.model("Ecomm", ecommerceSchema)
export default ecommerceModel