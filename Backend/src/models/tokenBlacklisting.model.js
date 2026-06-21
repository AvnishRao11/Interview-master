import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// TTL Index
blackListTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const blackListTokenModel = mongoose.model(
    "BlackListToken",
    blackListTokenSchema
);

export default blackListTokenModel;