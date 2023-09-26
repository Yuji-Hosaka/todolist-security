const jwt = require('jsonwebtoken')
const prisma = require('../models/prisma')

module.exports = async (req,res,next) => {
    try {
        const authorization = req.headers.authorization
        console.log(authorization)
        if(!authorization) {
            return res.status(401).json({message: "Unauthenticated"})
        }
        if(!authorization.startsWith("Bearer ")) {
            return res.status(401).json({message: "Unauthenticated"})
    
        }
        const token = authorization.split(' ')[1]
    
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'default')
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        // console.log(user)
        if(!user) {
            return res.status(401).json({message: "User Not Found"})
        }
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}