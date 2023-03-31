/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

class Product {
    fields = {
        productId: {
            type: BigInt,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productOwnerName: {
            type: String,
            required: true
        },
        developers:{
            type: Array,
            required: true
        },
        scrumMasterName:{
            type: String,
            required: true
        },
        startDate:{
            type: String,
            required: true
        },
        methodology:{
            type: String,
            required: true 
        }
    }

}

Product.lastId = 0;

Product.data = []

/* Find a product data Controller*/
Product.find = function(condition, callback) {
    let result = Product.data.reduce(function(a, x) {
        let flag = true;
        for (let k in Object.keys(condition)) {
            flag &= (condition[k] == x[k]);
        }
        if (flag) a.push(x);
        return a;
    }, []);

    if (typeof callback === "function") callback(false, result);
}

Product.add = function(data, callback) {
    Product.data.push(data);
    Product.lastId++;
    if (typeof callback === "function") callback(false, true);
}

/* Delete a product data Model func*/
Product.findByIdAndDelete = function(id, callback) {
    for (let i in Product.data) {
        if (Product.data[i].productId == id) {
            delete Product.data[i];
        }
    }
    if (typeof callback === "function") callback(false, true);   
}

/* Update a product data Model func*/
Product.findByIdAndUpdate = function(id, data, callback) {
    for (let i in Product.data) {
        if (Product.data[i].productId == id) {
            for (let k in data) {
                Product.data[i][k] = data[k];
            }
        }
    }
    if (typeof callback === "function") callback(false, true);
}

/* Search product data Model func*/
Product.findByKeyword = function(keyword, callback) {
    let tokenize = function(s) {
        if (typeof s !== "string") return [];

        return s.split(/(\s+)/).filter(function(e) {
            return e.trim().length > 0;
        }).map(function(e) {
            return e.toLowerCase();
        });
    };

    let keywords = tokenize(keyword);
    let result = Product.data.reduce(function(a, x) {
        let words = tokenize([x.scrumMasterName].concat(x.developers).join(' '));
        if(words.filter(function(x) { return keywords.indexOf(x) > -1; }).length >= keywords.length) {
            a.push(x);
        }
        return a;
    }, []);

    if (typeof callback === "function") callback(false, result);
}


Product.prototype.getProductId = function() {
    return this.productId;
}

Product.prototype.setProductId = function(productId) {
    this.productId = productId;
}

Product.prototype.getProductOwnerName = function() {
    return this.productOwnerName;
}

Product.prototype.setProductOwnerName = function(productOwnerName) {
    this.productOwnerName = productOwnerName;
}

Product.prototype.getDevelopers = function() {
    return this.developers;
}

Product.prototype.setDevelopers = function(developers) {
    this.developers = developers;
}

Product.prototype.getScrumMasterName = function() {
    return this.scrumMasterName;
}

Product.prototype.setScrumMasterName = function(scrumMasterName) {
    this.scrumMasterName = scrumMasterName;
}

Product.prototype.getStartDate = function() {
    return this.startDate;
}

Product.prototype.setStartDate = function(startDate) {
    this.startDate = startDate;
}

Product.prototype.getMethodology = function() {
    return this.methodology;
}

Product.prototype.setMethodology = function(methodology) {
    this.methodology = methodology;
}

/* Create a product data Model func*/
Product.prototype.save = function(callback) {
    this.productId = Product.lastId + 1;
    Product.add(this);
    if (typeof callback === "function") callback(false, this);
}

module.exports=Product;