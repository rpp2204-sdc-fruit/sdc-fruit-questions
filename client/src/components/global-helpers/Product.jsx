import React from 'react';

export default function Product({ id, name }) {
  return (
    <div>
      <div>Name: {name}</div>
      <div>productId: {id}</div>
    </div>
  );
}
