import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
    website_title: {
        type: String,
        require: true,
    },
    website_logo: {
        type: String,
    },
    footer_description: {
        type: String,
        require: true,
    },
})

export default mongoose.model('Setting', settingSchema)