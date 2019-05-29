const moongose = require('mongoose');

const Item = moongose.model('Item', {

    itemId: {
        type: String
    },
    itemName: {
        type: String
    },
    itemPrice: {
        type: Number
    },
    itemImageName: {
        type: String
    },
    itemDescription: {
        type: String
    }
})

module.exports = Item;