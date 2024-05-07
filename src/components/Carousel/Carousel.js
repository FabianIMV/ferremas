import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { searchProducts } from '../../dynamodb';
import alicate from '../ProductTable/alicate.webp';
import serrucho from '../ProductTable/serrucho.webp';
import destornillador from '../ProductTable/destornillador.webp';
import lente from '../ProductTable/lente.webp';
import overol from '../ProductTable/overol.webp';
import casco from '../ProductTable/casco.webp';
import cemento from '../ProductTable/cemento.webp';
import mortero from '../ProductTable/mortero.webp';
import plancha from '../ProductTable/planchazinc.webp';
import tornilloautoperforante from '../ProductTable/tornilloautoperforante.webp';
import tornillomadera from '../ProductTable/tornillomadera.webp';
import tornillotecho from '../ProductTable/tornillotecho.webp';
import item from '../ProductTable/item.png';
import './Carousel.css';
import axios from 'axios';
import xml2js from 'xml2js';

async function getRandomProducts() {
  try {
    const allProducts = await searchProducts();
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const randomProducts = await getRandomProducts();
      setProducts(randomProducts);
    };

    fetchProducts();
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
  return (
    <Carousel>
      {products.map((product, idx) => {
        let imageSrc;
        if (product.name.toLowerCase() === 'alicate') {
          imageSrc = alicate;
        } else if (product.name.toLowerCase() === 'serrucho') {
          imageSrc = serrucho;
        } else if (product.name.toLowerCase() === 'lentes de seguridad') {
          imageSrc = lente;
        } else if (product.name.toLowerCase() === 'overol de trabajo') {
          imageSrc = overol;
        } else if (product.name.toLowerCase() === 'destornillador') {
          imageSrc = destornillador;
        } else if (product.name.toLowerCase() === 'casco de seguridad') {
          imageSrc = casco;
        } else if (product.name.toLowerCase() === 'cemento') {
          imageSrc = cemento;
        } else if (product.name.toLowerCase() === 'mortero') {
          imageSrc = mortero;
        } else if (product.name.toLowerCase() === 'plancha de zinc') {
          imageSrc = plancha;
        } else if (product.name.toLowerCase() === 'tornillo autoperforante') {
          imageSrc = tornilloautoperforante;
        } else if (product.name.toLowerCase() === 'tornillo madera') {
          imageSrc = tornillomadera;
        } else if (product.name.toLowerCase() === 'tornillo techo') {
          imageSrc = tornillotecho;
        } else {
          imageSrc = item;
        }

        return (
          <Carousel.Item key={idx} className="custom-carousel">
            <img
              className="custom-image"
              src={imageSrc}
              alt={product.name}
            />
            <h3 className="">{product.name}</h3>
            <h4 className="">${product.price} - USD ${Math.round(product.price / exchangeRate)} </h4>
            <Carousel.Caption className="bg-dark p-3 rounded custom-caption">
              
            </Carousel.Caption>
            <div className="product-description bg-dark p-3 rounded custom-caption">
              <p className="text-light">{product.description}</p>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ProductCarousel;