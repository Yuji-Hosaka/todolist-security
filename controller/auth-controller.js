const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../models/prisma')
exports.register = async (req,res,next) => {
    try {
        const {username, email, password, confirmPassword} = req.body
        const hashedPassword = await bcrypt.hash(password,12)
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({message: "Success"})
    } catch(err) {
        next(err)
    }
}

exports.login = async (req,res,next) => {
    try {
        const {username, password} = req.body
        const targetUser = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!targetUser) {
            return res.status(400).json({message: 'Invalid credential'})
        }
        const isMatch = await bcrypt.compare(password, targetUser.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credential!!'})
        }

        const payload = {
            id: targetUser.id
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'default',{
            expiresIn: process.env.JWT_EXPIRE || '1'
        })
        res.status(200).json({accessToken})
    } catch (err) {
        next(err)
    }
}