import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListItem from './ProductListItem';

const ProductList = () => {
    // state : 여러 행을 받아옴 : 배열
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // 스프링 서버에 요청해서 데이터 받아오는 함수 작성 
    const loadData = async () => {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/product/productList');
        console.log(response.data);
        setData(response.data);
        setLoading(false);
    }

    // 렌더링할 때마다 호출
    // useEffect() 사용 : 빈배열 (loadData() 함수를 한 번만 호출)
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <h3>상품 정보 조회</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>상품번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>제조회사</th>
                        <th>재고</th>
                        <th>제조일</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 각 행 출력 : <ProductListItem> 반복 호출 */}
                    {
                        data.map(function (prd, i) {
                            return <ProductListItem prd={prd} key={i} />
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
export default ProductList