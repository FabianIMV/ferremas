import React from 'react';
import audifonos from './audifonos.webp';
import pantalla from './pantalla.jpeg';
import reloj from './reloj.jpeg';
import teclado from './teclado.webp';
import iphone15 from './iphone15.jpeg';
import cadena from './cadena.webp';
import item from './item.png';
import '../../App.css';

function ProductTable({ products }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar al carrito</th> {/* nueva columna */}
          <th scope="col">Comprar ahora</th> {/* nueva columna */}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          let imageSrc;
          if (product.name.toLowerCase() === 'audifonos') {
            imageSrc = audifonos;
          } else if (product.name.toLowerCase() === 'pantalla') {
            imageSrc = pantalla;
          } else if (product.name.toLowerCase() === 'cadena de oro') {
            imageSrc = cadena;
          } else if (product.name.toLowerCase() === 'teclado') {
            imageSrc = teclado;
          } else if (product.name.toLowerCase() === 'reloj') {
            imageSrc = reloj;
          } else if (product.name.toLowerCase() === 'iphone 18') {
            imageSrc = iphone15;
          } else {
            imageSrc = item;
          }

          return (
            <tr key={product.name}>
              <td className="align-middle text-left"><img src={imageSrc} alt="item" className="img"></img></td>
              <td className="align-middle text-left">{product.name}</td>
              <td className="align-middle text-left">${product.price}</td>
              <td className="align-middle text-left"><button className="btn btn-outline-secondary">Agregar al carrito</button></td> {}
              <td className="align-middle text-left"><button className="btn btn-outline-secondary">Comprar ahora</button></td> {}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;