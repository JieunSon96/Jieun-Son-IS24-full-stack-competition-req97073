var productModel = require('./productModel');

// initialize data
productModel.add({productId:1,productName: "Mechanical punch", productOwnerName:"Smriti Shakdher",developers: ["Josh Rintoul","	Jeffrey Joju","Rhiannon Herbert","James Elson"],scrumMasterName: "Vasavi Kakkat", startDate: "2023/01/25", methodology: "Agile"});
productModel.add({productId:2,productName: "Port-a-punch", productOwnerName:"Mike Zhou",developers: ["Yuhan Freeman","Sarah Son","Jeffrey Joju","Gurman Singh","James Elson"],scrumMasterName: "Olabisi Oluwakorede	", startDate: "2023/02/01", methodology: "Waterfall"});
productModel.add({productId:3,productName: "Electric punch", productOwnerName:"Smriti Shakdher",developers: ["Ian Laing","Brian Kim","Josh Rintoul","Gurman Singh","Colin Newall"],scrumMasterName: "Sona Pareshshah", startDate: "2023/03/15", methodology: "Agile"});
productModel.add({productId:4,productName: "Duplicating punch", productOwnerName:"Alix Cote",developers: ["Yuhan Freeman","Rhiannon Herbert","Sarah Son","Josh Rintoul","James Elson"],scrumMasterName: "Caitlin Leckie", startDate: "2023/03/23", methodology: "Agile"});

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