const mongoose = require('mongoose');


async function connectDb() {
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/authentication", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("conection successfully");
    } catch (error) {
        console.log(error);

    }


}
connectDb();

