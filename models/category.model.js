const Category = require('../databases/category');

module.exports = {
    getCategoryList: () =>{
        try {
            const categoryList = Category.find({show: true}).exec();
            return categoryList;
        } catch (error) {
            console.log(error);
            return -1;
        }
    },
}