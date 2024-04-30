import { Lambda, config } from 'aws-sdk';

config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAY4QIKKWUDHQWUEWL',
  secretAccessKey: '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',
});

const lambda = new Lambda();

export function searchProducts(searchTerm) {
  const params = {
    FunctionName: 'consultaProductos',
    Payload: JSON.stringify({ body: JSON.stringify({ searchTerm }) }),
  };

  return new Promise((resolve, reject) => {
    lambda.invoke(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        const payload = JSON.parse(data.Payload);
        const body = JSON.parse(payload.body);
        resolve(body);
        console.log(body)
      }
    });
  });
}