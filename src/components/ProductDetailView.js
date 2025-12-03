import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailView = () => {
    // 파라미터로 받아온 값 
    const { prdNo } = useParams();
    // state 
    const [prd, setPrd] = useState({
        //prdNo:'',  // 대시 파라미터 사용
        prdName: '',
        prdPrice: '',
        prdCompany: '',
        prdStock: '',
        prdDate: ''
    });
    const [loading, setLoading] = useState(false);

    // 스프링 서버에 요청해서 데이터 받아오는 함수 작성 
    // 받아온 값으로 state 설정
    const loadData = async () => {
        setLoading(true);
        //const response = await axios.get('http://localhost:8080/product/productDetailView' + prdNo); // 동일
        const response = await axios.get(`http://localhost:8080/product/productDetailView/${prdNo}`);
        console.log(response.data);
        setPrd({
            //prdNo:response.data.prdNo, // 대신 파라미터 사용 가능
            prdName: response.data.prdName,
            prdPrice: response.data.prdPrice,
            prdCompany: response.data.prdCompany,
            prdStock: response.data.prdStock,
            prdDate: response.data.prdDate
        });
        setLoading(false);
    }

    // 렌더링할 때마다 호출
    // useEffect() 사용 : 빈배열 (loadData() 함수를 한 번만 호출)
    useEffect(() => {
        loadData();
    }, []);

    // 날짜 포맷 변경
    let moment = require('moment');
    let date = moment(prd.prdDate).format('YYYY-MM-DD');    

    return (
        <div>
            <h3>상품 상세 정보 조회</h3>
            <table border="1" width="500">
                <thead>
                    <tr><td>상품번호</td><td>{prdNo}</td></tr>
                    <tr><td>상품명</td><td>{prd.prdName}</td></tr>
                    <tr><td>가격</td><td>{prd.prdPrice}</td></tr>
                    <tr><td>제조회사</td><td>{prd.prdCompany}</td></tr>
                    <tr><td>재고</td><td>{prd.prdStock}</td></tr>
                    <tr><td>제조일</td><td>{date}</td></tr>
                </thead>
            </table>
        </div>
    );
};

export default ProductDetailView;    
