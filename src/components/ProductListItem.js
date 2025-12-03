import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductListItem = ({ prd }) => {
    // 날짜 포맷 변경
    let moment = require('moment');
    let date = moment(prd.prdDate).format('YYYY-MM-DD');

    let history = useNavigate();

    // 삭제 버튼 클릭했을 때 
    const onDeleteItem = () => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.get('http://localhost:8080/product/delete/' + prd.prdNo)
            //axios.delete('http://localhost:8080/product/delete/' + prd.prdNo)
                .then(
                    () => {
                        history('/productList');
                        window.location.reload();
                        // reload 하지 않으면 
                        // DB에서는 삭제되지만 현재 화면은 안 바뀜
                    }
                ).catch(err => console.log(err));
        }
    };

    return (
        <tr>
            <td><Link to={"/productDetailView/" + prd.prdNo}>{prd.prdNo}</Link></td>
            <td>{prd.prdName}</td>
            <td>{prd.prdPrice}</td>
            <td>{prd.prdCompany}</td>
            <td>{prd.prdStock}</td>
            {/*<td>{prd.prdDate}</td>*/}
            <td>{date}</td>
            <td><Link to={"/productUpdate/" + prd.prdNo}>수정</Link></td>
            <td><button onClick={onDeleteItem}>삭제</button></td>
        </tr>
    );
};

// const ProductListItem = (props) => { //props로 받음
//     return (
//         <tr>
//             <td>{props.prd.prdNo}</td>
//             <td>{props.prd.prdName}</td>
//             <td>{props.prd.prdPrice}</td>
//             <td>{props.prd.prdCompany}</td>
//             <td>{props.prd.prdStock}</td>
//             <td>{props.prd.prdDate}</td>
//             <td>수정</td>
//             <td>삭제</td>
//         </tr>
//     );
// };

export default ProductListItem;