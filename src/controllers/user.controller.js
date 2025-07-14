import asyncHandler from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js'; 
import {uploadOnCloudinary} from '../utils/cloudinary.js'; 
import { ApiResponse } from '../utils/apiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user detail from frontend
    // validation = not empty
    // check if user already exists= username, email
    // check for images, check for avatar
    // upload then to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token feed from response
    // check for user creation 
    // return response

    const {fullName, email, password, username} = req.body;
    console.log("email", email);

    if ( 
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email or username");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        
    if(!avatar) {
        throw new ApiError(400, "Failed to upload avatar image");
    }

    const user =await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "" ,
        email,
        password,
        username : username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "UserRegistered Successfully")
    ); 

});

export { registerUser };