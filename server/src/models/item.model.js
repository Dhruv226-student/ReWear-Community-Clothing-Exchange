const mongoose = require('mongoose');
const { ITEM, FILES_FOLDER } = require('../helper/constant.helper');
const { paginate } = require('./plugins');
const config = require('../config/config');

const itemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        category: String, // e.g., "Shirt", "Dress"
        type: String, // e.g., "Casual", "Formal"
        size: String, // e.g., "M", "L", "XL"
        condition: String, // e.g., "New", "Used"
        tags: [String], // e.g., ["summer", "cotton"]
        images: [String], // URLs of uploaded images
        status: {
            type: String,
            enum: Object.values(ITEM.STATUS),
            default: ITEM.STATUS.pending,
        },
        exchange_points: Number,
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: function (_doc, ret) {
                ret.images =
                    ret.images?.length && !ret.images?.includes('', null)
                        ? ret.images.map(
                              (image) => `${config.base_url}/${FILES_FOLDER.clothImages}/${image}`
                          )
                        : [];
            },
        },
    }
);

itemSchema.plugin(paginate);

module.exports = mongoose.model('Item', itemSchema);
