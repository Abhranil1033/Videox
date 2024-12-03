import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        unique:true,
        lowercase: true,
        trim : true,
        index: true
    },
    email:{
        type : String,
        required : true,
        unique:true,
        lowercase: true,
        trim : true,
        index: true
    },
    fullname:{
        type: String,
        required : true,
        trim : true,
        index: true
    },
    avatar:{
        type: String,
        required:true
    },
    coverImages: {
        type: String
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password:{
        type: String,
        required : [true, 'Password is required']
    },
    refreshToken:{
        type: String
    }
},{timestamps:true})

// "pre" is one of the mongoose hooks
// it executes this code just before the data is about to be saved
// here, we want to encrypt our password just before it is about to be saved

// here we cant use arrow function for callback as the arrow function doesnt have context,and in this case
// context is very essential as we have to perform operations on the user which we get from userSchema

// but one thing to notice here is that whenever the data is saved, the psasword is encrypted each and every time. but we dont want it to happen in this way
// what we want is only when the password is changed or saved, only then to encrypt the password, not for any other fields like name, email, avatar etc
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10);
        next()
    }else{
        return
    }
}) // "type of middleware", callback // async because the processing may take some time

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username : this.username,
        fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User",userSchema)