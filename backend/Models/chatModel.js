const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timeseries: true,
    }
);

const ChatModel = mongoose.model("chat", ChatSchema);
module.exports = ChatModel;