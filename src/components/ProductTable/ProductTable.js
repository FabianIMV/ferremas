import React, { useEffect, useState} from 'react';
import alicate from './alicate.webp';
import serrucho from './serrucho.webp';
import destornillador from './destornillador.webp';
import lente from './lente.webp';
import overol from './overol.webp';
import casco from './casco.webp';
import cemento from './cemento.webp';
import mortero from './mortero.webp';
import plancha from './planchazinc.webp';
import tornilloautoperforante from './tornilloautoperforante.webp';
import tornillomadera from './tornillomadera.webp';
import tornillotecho from './tornillotecho.webp';
import item from './item.png';
import '../../App.css';
import axios from 'axios';
import xml2js from 'xml2js';

const images = {
  'alicate': alicate,
  'serrucho': serrucho,
  'lentes de seguridad': lente,
  'overol de trabajo': overol,
  'destornillador': destornillador,
  'casco de seguridad': casco,
  'cemento': cemento,
  'mortero': mortero,
  'plancha de zinc': plancha,
  'tornillo autoperforante': tornilloautoperforante,
  'tornillo madera': tornillomadera,
  'tornillo techo': tornillotecho,
  default: item,
};

function ProductTable({ products, addToCart }) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=ab7f92c29c235cc96ef34099b8ba9cea5731ad2a&formato=xml')
    .then(response => {
      xml2js.parseString(response.data, (err, result) => {
        if (err) {
          console.error('Error parsing XML', err);
          setError('Error parsing XML');
        } else {
          console.log(result)
          const rate = parseFloat(result.IndicadoresFinancieros.Dolares[0].Dolar[0].Valor[0].replace(',', '.'));
          setExchangeRate(rate);
          console.log(rate);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching exchange rate.', error);
      setError('Error fetching exchange rate.');
    });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return null;
  }

  const productRows = [];
  for (let i = 0; i < products.length; i += 3) {
    productRows.push(products.slice(i, i + 3));
  }

  const handleAddToCart = (product, quantity) => {
    const updatedProduct = { ...product, stock: product.stock - quantity };
    
    addToCart({ ...updatedProduct, quantity });
  };

  return (
    <div>
      {productRows.map((productRow, rowIndex) => (
        <div key={rowIndex} className="row">
          {productRow.map((product) => {
            const imageSrc = images[product.name.toLowerCase()] || images.default;

            return (
              <div key={product.name} className="col" style={{ padding: '10px' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                  <img src={imageSrc} alt="item" className="card-img-top"></img>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{exchangeRate && `${product.price} - USD ${Math.round(product.price / exchangeRate)}`}</p>
                    <p className="card-text">Stock: {product.stock}</p>                
                    <button className="btn btn-outline-secondary" onClick={() => handleAddToCart(product, 1)}>Agregar al carrito</button>
                    <button className="btn btn-outline-secondary">Comprar ahora</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ProductTable;