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

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio (UF)</th>
          <th scope="col">Agregar al carrito</th> {/* nueva columna */}
          <th scope="col">Comprar ahora</th> {/* nueva columna */}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
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
            <tr key={product.name}>
              <td className="align-middle text-left"><img src={imageSrc} alt="item" className="img"></img></td>
              <td className="align-middle text-left">{product.name}</td>
              <td className="align-middle text-left">${product.price}</td>
              <td className="align-middle text-left"><button className="btn btn-outline-secondary" onClick={() => addToCart(product)}>Agregar al carrito</button></td> {/* botón con evento onClick */}
              <td className="align-middle text-left"><button className="btn btn-outline-secondary">Comprar ahora</button></td> {}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;