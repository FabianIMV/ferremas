import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { searchProducts } from '../../dynamodb.js';

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
      {products.map((product, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={product.image}
            alt={product.name}
          />
          <Carousel.Caption className="bg-dark p-3 rounded">
            <h3 className="text-light">{product.name}</h3>
            <p className="text-light">{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;