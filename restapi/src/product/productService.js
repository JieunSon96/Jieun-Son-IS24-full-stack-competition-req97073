var productModel = require('./productModel');

// initialize data
productModel.add({productId:1,productName: "sphinx", productOwnerName:"Nayong Sung",developers: ["Kuk","Jason","MJ"],scrumMasterName: "greek", startDate: "2023/04/25", methodology: "Agile"});
productModel.add({productId:2,productName: "hydra", productOwnerName:"Kaite Jin",developers: ["TK","Kevin","Sarah"],scrumMasterName: "greek", startDate: "2023/05/23", methodology: "Wainlnie"});
productModel.add({productId:3,productName: "huldra", productOwnerName:"Naomio Shin",developers: ["TK","Kevin","Sarah"],scrumMasterName: "greek", startDate: "2023/05/23", methodology: "Wainlnie"});
productModel.add({productId:4,productName: "cyclops", productOwnerName:"hello sin",developers: ["TK","Kevin","Sarah"],scrumMasterName: "greek", startDate: "2023/05/23", methodology: "Agile"});
productModel.add({productId:5,productName: "fenrir", productOwnerName:"kIMS'SMARKT",developers: ["TK","Kevin","Sarah"],scrumMasterName: "greek", startDate: "2023/05/23", methodology: "Wainlnie"});
productModel.add({productId:6,productName: "medusa",  productOwnerName:"hODI SIN",developers: ["TK","Kevin","Sarah"],scrumMasterName: "greek", startDate: "2023/05/23", methodology: "Wainlnie"});

/* Get all product data */
module.exports.getAllProductFromService = () => {
    return new Promise(function checkURL(resolve,reject){
        productModel.find({},function returnData(error,result){
            if(error){
                reject(false);
            }else{
                resolve(result);
            }
        })
    })
}

/* Create product data */
module.exports.createProductService = (productData) => {
    return new Promise(function myFn(resolve, reject) {
        var productModelData = new productModel();
        productModelData.productName = productData.productName;
        productModelData.productOwnerName = productData.productOwnerName;
        productModelData.developers = productData.developers;
        productModelData.scrumMasterName = productData.scrumMasterName;
        productModelData.startDate = productData.startDate;
        productModelData.methodology = productData.methodology;
 
        productModelData.save(function resultHandle(error, result) {
            if (error) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
}


/* Update product data */
module.exports.updateProductService = (id,productData) => {    
    return new Promise(function myFn(resolve, reject) {
        productModel.findByIdAndUpdate(id,productData, function returnData(error, result) {
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }
        });
    });
}
 

/* Delete product data */
module.exports.removeProductService = (id) => {
    return new Promise(function myFn(resolve, reject) {
        productModel.findByIdAndDelete(id, function returnData(error, result) {
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }          
        });
    });
}

/* Get all product data by Search Keyword*/
module.exports.getPrdByKeywordService = (keyword) => {
    return new Promise(function checkURL(resolve,reject){
        productModel.findByKeyword(keyword, function returnData(error,result){
            if(error){
                reject(false);
            }else{
                resolve(result);
            }
        })
    })
}