import mongoose, {Schema} from 'mongoose';
import jwt  from 'jsonwebtoken';
import bcypt from "bcrypt";

const userSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // Ensure no leading/trailing spaces
        index: true // Index for faster lookups in searches
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true 
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true 
    },
    avatar: {
        type: String, // cloudnary URL 
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, 
{
    timestamps: true
});

// Method to generate JWT token
// Middleware to hash password before saving
userSchema.pre("save", async function(next) { 
    if (!this.isModified("password")) {
        return next(); // Skip hashing if password is not modified
    }
    this.password = await bcypt.hash(this.password, 10);
    next();
});

// Method to compare password with hashed password
userSchema.methods.isPasswordCorrect = async function(password) { // Method to compare password with hashed password
    return await bcypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Default to 1 day if not set
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Default to 10 day if not set
        }
    )
}

export const User = mongoose.model("User", userSchema);