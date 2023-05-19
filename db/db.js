const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

const schema = mongoose.Schema;



const newQuestion = new schema(
    {
        question: String,
        aA: String,
        aB: String,
        aC: String,
        aD: String,
        correct: { type: String, enum: ['A', 'B', 'C', 'D'], required: true }
    }
)


module.exports.newQuestion = mongoose.model("new_question", newQuestion);

