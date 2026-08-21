import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    timestamps: {
        type: Date,
        default: Date.now,
    }
})

categorySchema.pre('validate', function () {
    this.slug = slugify(this.name, { lower: true });
})

export default mongoose.model('Category', categorySchema)