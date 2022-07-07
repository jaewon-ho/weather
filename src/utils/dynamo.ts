import { rejects } from "assert";
import { resolve } from "path/posix";

const AWS = require("aws-sdk");
const moment = require('moment');

const config = {
    aws_table_name: process.env.DYNAMO_TABLE_NAME,
    aws_remote_config: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION
    }
}

AWS.config.update(config.aws_remote_config);
const ddb = new AWS.DynamoDB();


export const selectByType = (type: string) : any => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: config.aws_table_name,
            Key: {
                DATA_TYPE: {S: type}
            }
        }
    
        ddb.getItem(params, (err, data) => {
            if (err) { 
                console.log(err);
                reject(err);
            } else {
                resolve(data.Item);
            }
        })

    })
}

export const insert = (type: string, data: object) : any => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: config.aws_table_name,
            Item: {
                DATA_TYPE: {S: type},
                DATA: {S: JSON.stringify(data)},
                BASE_DATE: {S: moment().format('YYYY-MM-DD HH:mm')}
            }
        }
    
        ddb.putItem(params, (err, data) => {
            if (err) { 
                reject(err);
            } else {
                resolve({});
            }
        })
    })
}


export const update = (type: string, data: object) : any => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: config.aws_table_name,
            Key: {
                DATA_TYPE: {S: type}
            },
            UpdateExpression : 'set #data = :data, BASE_DATE = :base_date',
            ExpressionAttributeNames: { "#data": "DATA" },
            ExpressionAttributeValues:{
                ":data": {S: JSON.stringify(data)},
                ":base_date": {S: moment().format('YYYY-MM-DD HH:mm')}
            },        
        }
        
        ddb.updateItem(params, (err, data) => {
            if (err) { 
                console.log(err);
                reject(err);
            } else {
                resolve({});
            }
        })
    });
}
