import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
