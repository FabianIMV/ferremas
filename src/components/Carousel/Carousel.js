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
          <Carousel.Item key={idx} className="custom-carousel">
            <img
              className="custom-image"
              src={imageSrc}
              alt={product.name}
            />
            <Carousel.Caption className="bg-dark p-3 rounded custom-caption">
              <h3 className="text-light">{product.name}</h3>
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