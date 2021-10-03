const { User } = require("../../db/schema")


const resolver = {

    getUserDetail: (args, req) => {


        console.log(args.id);
        return { _id: "ashish", email: "ashshasini0099@gmail.com" }
    }

}
module.exports = resolver