const mongoose =require('mongoose');
const Schema = mongoose.Schema;


let MoneySchema = new Schema({
    name1: {
        type: String,
        required: true
    },
    name2: {
        type: String
    },
    amount: {
        type: Number
    }
},{
    collection: 'MoneyTransfer'
}

)
module.exports = mongoose.model('MoneyTransfer', MoneySchema)