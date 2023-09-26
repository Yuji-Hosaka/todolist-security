module.exports = (req,res,next) => {
    // throw new Error('Test error middleware')
    res.status(404).json({message: 'Resource not found'})
}