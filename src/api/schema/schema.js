var { buildSchema } = require("graphql");


const schema = buildSchema(`
  type UserDetails{
      name:String
      cart:CartType
      _id:String
      email:String

  }
  type CartType{
      productId:String,
      quantity:Int
  }
 
  type Query{
      getUserDetail(id:ID):UserDetails
  }
`)

module.exports = schema