
// const asyncHandler = () => {}
// const asyncHandler = (fn) => {}
// const asyncHandler = (fn) => {() => {}}

// this type of writing functions is broken down into three steps above
// for better understanding

// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }


// the same thing written above ; but using Promises
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}



export {asyncHandler};