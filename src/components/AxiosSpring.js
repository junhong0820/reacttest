import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AxiosSpring = () => {
    // state
    const [data, setData] = useState('');

    // 스프링 서버에 요청해서 데이터 받아오는 함수 작성 
    const loadData = async () => {
        const response = await axios.get('http://localhost:8080/hello');
        console.log(response.data);
        setData(response.data);
    }

    // 렌더링할 때마다 호출
    // useEffect() 사용 : 빈배열 (loadData() 함수를 한 번만 호출)
    useEffect(() => {
        loadData();
    }, []);


    return (
        <div>
            <h3>서버로부터 받아온 값</h3>
            {data}
        </div>
    );
};

export default AxiosSpring;