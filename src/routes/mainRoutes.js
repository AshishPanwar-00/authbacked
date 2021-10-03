const express = require('express')
const router = express.Router();
const graphqlApi = require('../api/graphql')


router.use(graphqlApi)


//protected routes
router.get("/pro", (req, res) => {


    if (req.isAuthenticated()) {
        res.send("you are authenticated")
    }
    else {
        res.send('your are not authenticated')
    }
})


module.exports = router