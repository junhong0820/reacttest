import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductUpdate = () => {
    // (1) Part1 : prdNo에 해당되는 상품 정보 받아오기 
    // deatailView와 동일
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


    // (2) Part2 : 폼에 입력한 수정된 값을 전송하고 포워딩
    // 상품 등록 완료후 상품정보조회 화면으로 포워딩 하기  : useNavigate() 훅 사용
    let history = useNavigate();

    // <input> 태그 입력 시 onChange 이벤트 처리 함수
    const onChange = (e) => {
        // e.target에서 name과 value 추출
        const { value, name } = e.target;
        // 값 설정
        setPrd({
            ...prd, // 기존의 prd 객체를 복사한 뒤
            [name]: value // name 키를가진 값을 value로 설정
        });
    };

    // [취소] 버튼 눌렀을때 값 비우는 함수
    const onReset = () => {
        setPrd({
            prdNo: prd.prdNo, // 상품번호는 안 지움
            prdName: '',
            prdPrice: '',
            prdCompany: '',
            prdStock: '',
            prdDate: prd.prdDate //날짜 타입이기 때문에 '' 으로하면 Invalid date 출력 값 그대로 유지
        });
    };

    // [수정] 버튼 눌렀을 때
    const onSubmit = (e) => {
        e.preventDefault();

        let frmData = new FormData(document.frmUpdate);
        axios.post('http://localhost:8080/product/update', frmData)
        //axios.put('http://localhost:8080/product/update', frmData)
            .then(
                response => {
                    alert("수정 완료");
                    history('/productList'); // 전제 상품 조회 화면으로 포워딩(location.href 가능)
                }
            );
    };

    return (
        <div>
            <h3>상품 정보 수정</h3>
            <form name="frmUpdate" onSubmit={onSubmit} onReset={onReset}>
                <table>
                    <thead>
                        <tr>
                            <td>상품번호</td>
                            <td> <input
                                type="text"
                                name="prdNo"
                                value={prdNo}
                                readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>상품명</td>
                            <td> <input
                                type="text"
                                name="prdName"
                                value={prd.prdName}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td> <input
                                type="text"
                                name="prdPrice"
                                value={prd.prdPrice}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>제조회사</td>
                            <td> <input
                                type="text"
                                name="prdCompany"
                                value={prd.prdCompany}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>재고</td>
                            <td> <input
                                type="text"
                                name="prdStock"
                                value={prd.prdStock}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>제조일</td>
                            <td> <input
                                type="text"
                                name="prdDate"
                                value={date}
                                onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="수정" /> &nbsp;
                                <input type="reset" value="취소" />
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );

}
export default ProductUpdate