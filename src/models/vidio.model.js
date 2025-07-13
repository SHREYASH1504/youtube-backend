import mongoose, {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    videoFile: {
        type: String, // cloudinary URL for the video file
        required: true
    },
    thumbnail: {
        type: String, // cloudinary URL for the thumbnail image
        required: true
    },
    title: {
        type: String, // cloudinary URL for the video file
        required: true
    },
    description: {
        type: String, // Description of the video
        required: true,
        trim: true
    },
    duration: {
        type: String, // Duration of the video in HH:MM:SS format
        required: true
    },
    views: {
        type: Number, // Number of views the video has received
        default: 0
    },
    isPublished: {
        type: Boolean, // Indicates if the video is published or not
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true});



videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);