import { DynamoDB, config } from 'aws-sdk';

config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
  secretAccessKey: '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',
});

const docClient = new DynamoDB.DocumentClient();

export function searchProducts(category, searchTerm) {
  let tableName;
  switch (category) {
    case 'Equipos de Seguridad':
      tableName = 'ferremas-es';
      break;
    case 'Herramientas Manuales':
      tableName = 'ferremas-hm';
      break;
    case 'Materiales Básicos':
      tableName = 'ferremas-mb';
      break;
    case 'Tornillos y Anclajes':
      tableName = 'ferremas-tya';
      break;
    default:
      throw new Error(`Categoría desconocida: ${category}`);
  }

  const params = {
    TableName: tableName,
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