import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { searchProducts } from '../../dynamodb';
import alicate from '../ProductTable/alicate.webp';
import serrucho from '../components/ProductTable/serrucho.webp';
import destornillador from '../components/ProductTable/destornillador.webp';
import lente from '../components/ProductTable/lente.webp';
import overol from '../components/ProductTable/overol.webp';
import casco from '../components/ProductTable/casco.webp';
import cemento from '../components/ProductTable/cemento.webp';
import mortero from '../components/ProductTable/mortero.webp';
import plancha from './components/ProductTable/planchazinc.webp';
import tornilloautoperforante from './components/ProductTable/tornilloautoperforante.webp';
import tornillomadera from './components/ProductTable/tornillomadera.webp';
import tornillotecho from './components/ProductTable/tornillotecho.webp';
import item from './item.png';

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

  useEffect(() => {
    const fetchProducts = async () => {
      const randomProducts = await getRandomProducts();
      setProducts(randomProducts);
    };

    fetchProducts();
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
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={imageSrc}
              alt={product.name}
            />
            <Carousel.Caption className="bg-dark p-3 rounded">
              <h3 className="text-light">{product.name}</h3>
              <p className="text-light">{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ProductCarousel;