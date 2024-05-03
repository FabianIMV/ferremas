import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { searchProducts } from '../../dynamodb';
import alicate from '../../images/alicate.jpg';
import serrucho from '../../images/serrucho.jpg';
import lente from '../../images/lente.jpg';
import overol from '../../images/overol.jpg';
import destornillador from '../../images/destornillador.jpg';
import casco from '../../images/casco.jpg';
import cemento from '../../images/cemento.jpg';
import mortero from '../../images/mortero.jpg';
import plancha from '../../images/plancha.jpg';
import tornilloautoperforante from '../../images/tornilloautoperforante.jpg';
import tornillomadera from '../../images/tornillomadera.jpg';
import tornillotecho from '../../images/tornillotecho.jpg';
import item from '../../images/item.jpg'; // imagen por defecto

// ...

function ProductCarousel() {
  // ...

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