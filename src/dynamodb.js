import { DynamoDB, config } from 'aws-sdk';

config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
  secretAccessKey: '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',
});

const docClient = new DynamoDB.DocumentClient();

export function searchProducts(searchTerm) {
  const params = {
    TableName: 'ferremas-products',
    FilterExpression: 'contains(#name, :name)',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': searchTerm,
    },
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}