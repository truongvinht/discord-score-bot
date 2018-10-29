// generateModel.js
// tool for generating model from database
// ================

//import
const c = require('../helper/constLoader');
const fs = require('fs');
const sql = require('../server/dbHandlerMySQL');
const path = require("path");
const template = require('../template/file_template.txt');


// method to generate a file based on class name and attributes
function generateClassFile(name, attributes) {

    //template
    let text = fs.readFileSync(path.resolve(__dirname, "./../template/file_template.txt"),'utf8');

    var output = "" + text;
    
    // replace class name
    output = output.replace(new RegExp("NAME", 'g'), name);

    var parameterContent = "";
    var initContent = "";
    var argumentContent = "";

    // prepare arguments
    if (attributes.length > 0) {

        for (let attr of attributes) {
            if (parameterContent.length == 0) {
                parameterContent = attr;
                initContent = `this.${attr} = ${attr};`;
                argumentContent = `$\{this.${attr}\}`;
            } else {
                parameterContent = parameterContent + ", " + attr;
                initContent = `${initContent}\n\tthis.${attr} = ${attr};`;
                argumentContent = `${argumentContent}, $\{this.${attr}\}`;
            }
        }
    }

    //replace content
    output = output.replace(new RegExp("PARAM", 'g'), parameterContent);
    output = output.replace(new RegExp("INIT", 'g'), initContent);
    output = output.replace(new RegExp("ARG", 'g'), argumentContent);
    
    fs.writeFile(`./model/${name}.js`, output, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

const generateModel = () => {
    const host = c.storageHost(), login = c.storageLogin(), password = c.storagePwd() ,database = c.storageDb();

    //init db connection
    sql.connectTo(host, login, password, database);

    const callback = (err1, result , f1) => {

        var queries = "";
        var tableNames = [];

        for (const table of result) {
            queries = queries + "DESCRIBE " + table.TABLE_NAME + ";";
            tableNames.push(table.TABLE_NAME);
        }

        if (queries.length > 0) {

            const completeSelectAllTables = (err, response, fields) => {
                console.log(response);
                for (let tableAttributes of response) {
                    let itemIndex = response.indexOf(tableAttributes);
                    let tableName = tableNames[itemIndex];
                    var attrList = [];

                    for (let attr of tableAttributes) {
                        attrList.push(attr.Field);
                    }
                    generateClassFile(convertNaming(tableName),attrList)
                }
            }

            sql.enableMultipleReq(true);
            sql.executeQuery(queries, completeSelectAllTables);
        } else {
            console.log('No tables found');
        }
    }

    // parse all relevant tables
    sql.executeQuery(`SELECT * FROM INFORMATION_SCHEMA.tables WHERE TABLE_SCHEMA="${c.storageDb()}"`, callback);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertNaming(name) {
    return capitalizeFirstLetter(name.toLowerCase());
}

// export
module.exports = {
    writeFile:generateModel
};