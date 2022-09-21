import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import ProductLinks from './ProductLinks.jsx';
import Topbar from './Topbar.jsx';

function App() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => {
      setProductName(res.data.name);
      setProductId(res.data.id);
    });
  }, [id]);

  useEffect(() => {
    const options = {
      method: 'get',
      url: `/products`,
    };

    axios(options)
      .then((response) => {
        const productList = response.data;
        setProducts([...productList]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const widgets =
    productId !== 0 ? (
      <>
        <Overview product_id={productId} />
        <QandAModule product_id={productId} product_name={productName} />
        <ReviewsModule product_id={productId} product_name={productName} />
      </>
    ) : null;

  return (
    <div>
      <Topbar />
      {widgets}
      <ProductLinks products={products} />
    </div>
  );
}

export default App;
