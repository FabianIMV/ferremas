import React, { useEffect, useState, useContext } from 'react';
import BackButton from '../BackButton/BackButton';
import {CartContext}  from '../Cart/CartContext';
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
import './ProductTable.css';

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

function ProductTable({ products, toggleBackButtonGeneral }) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  const { cart, setCart, setIsCartOpen } = useContext(CartContext);

  const [productQuantities, setProductQuantities] = useState({});
  useEffect(() => {
    toggleBackButtonGeneral();
    return () => {
      toggleBackButtonGeneral();
    };
  }, []);
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

  const handleAddToCart = (product) => {
    const quantity = productQuantities[product.name] || 1;
    const existingProduct = cart.find(p => p.name === product.name);

    if (existingProduct) {
      const updatedCart = cart.map(p =>
        p.name === product.name
          ? { ...p, quantity: p.quantity + quantity, totalPrice: (p.quantity + quantity) * p.price }
          : p
      );
      setCart(updatedCart);
    } else {
      const updatedProduct = { ...product, stock: product.stock - quantity, price: product.price };
      setCart(prevCart => [...prevCart, { ...updatedProduct, quantity, totalPrice: quantity * product.price }]);
    }

    setIsCartOpen(true);
  };

  const handleIncreaseQuantity = (productName) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productName]: (prevQuantities[productName] || 1) + 1,
    }));
  };

  const handleDecreaseQuantity = (productName) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productName]: Math.max(1, (prevQuantities[productName] || 1) - 1),
    }));
  };

  return (
    <div>
      <BackButton />
      {productRows.map((productRow, rowIndex) => (
        <div key={rowIndex} className="row">
          {productRow.map((product) => {
            const imageSrc = images[product.name.toLowerCase()] || images.default;
            const quantity = productQuantities[product.name] || 1;
  
            return (
              <div key={product.name} className="col">
                <div className="card">
                  <img src={imageSrc} alt="item" className="card-img-top"></img>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{exchangeRate && `${product.price} - USD ${Math.round(product.price / exchangeRate)}`}</p>
                    <p className="card-text">Stock: {product.stock}</p>     
                    <div className="buttonsproducttable"> 
                      <button className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantity(product.name)}>-</button>
                      <span>{quantity}</span>
                      <button className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantity(product.name)}>+</button>          
                      <button className="btn btn-outline-secondary" onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
                    </div>
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