import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import ProductDetailView from './ProductDetailView';
import ProductInsert from './ProductInsert';
import ProductUpdate from './ProductUpdate';

const Top = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/" style={{ marginRight: '20px' }}>홈 </Link>
                    <Link to="/productList" style={{ marginRight: '20px' }}>[상품 조회] </Link>
                    <Link to="/productInsert">[상품 등록]</Link>
                </li>
            </ul>
            <hr />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productList" element={<ProductList />} />
                <Route path="/productDetailView/:prdNo" element={<ProductDetailView />} />
                <Route path="/productInsert" element={<ProductInsert />} />
                <Route path="/productUpdate/:prdNo" element={<ProductUpdate />} />
            </Routes>
        </div>
    );
}

export default Top;