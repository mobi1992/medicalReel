import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
import {apis} from '../../@services'
const HomeScreen = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getHomeData();
    }, []);
    
    const getHomeData = async () => {
        try {
            setLoading(true)
            const { data: userDocs } = await apis.getUserDoc({ page });
            console.log(userDocs);
            setData(userDocs);
        } catch (e) {
            setLoading(true)
            if (e?.response?.data?.statusCode === 401) {
                await localStorage.removeItem("AUTH_TOKEN");
               // history.push('/')
                return;
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            
        </div>
    )
}

export default HomeScreen
