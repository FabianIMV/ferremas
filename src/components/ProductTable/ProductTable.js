import React from 'react';
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


function ProductTable({ products, addToCart }) {
  if (products.length === 0) {
    return null;
  }

  const productRows = [];
  for (let i = 0; i < products.length; i += 3) {
    productRows.push(products.slice(i, i + 3));
  }

  return (
    <div>
      {productRows.map((productRow, rowIndex) => (
        <div key={rowIndex} className="row">
          {productRow.map((product) => {
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
          } else if (product.name.toLowerCase() === 'overol de trabajo') {
            imageSrc = overol;
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
            <div key={product.name} className="col" style={{ padding: '10px' }}>
              <div className="card" style={{ width: '100%', height: '100%' }}>
                <img src={imageSrc} alt="item" className="card-img-top"></img>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-outline-secondary" onClick={() => addToCart(product)}>Agregar al carrito</button>
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