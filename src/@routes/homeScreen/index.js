import React, {useState, useEffect} from 'react'
import Navbar from '../navbar'
import Home from './homeScreen'
import { apis, routePaths } from '../../@services'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams } from 'react-router-dom'
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
            // if (data1 !== undefined){
            //     const { data: userDocs } = await apis.getUserDoc({ page, userId: data1.id });
            //     console.log(userDocs);
            //     setData(userDocs);
            // }
                const { data: userDocs } = await apis.getUserDoc({ page })
                console.log(userDocs);
                setData(userDocs);
            
        } catch (e) {
            setLoading(true)
            if (e?.response?.data?.statusCode === 401) {
                await localStorage.removeItem("AUTH_TOKEN");
                history.push(routePaths.login)
                return;
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <Home data = {data} loading = {loading}/>
        </div>
    )
}

export default HomeScreen
