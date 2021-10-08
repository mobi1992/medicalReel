import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom'
import {apis} from '../../@services'
import DocItem from './doc-item'
import './styles.css'
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


    if(data.length === 0 && !loading)
    {
        return (
            <div className = 'container'>
                <div className = 'row justify-content-center align-items-center pos-fixed'>
                    <div className = 'col-lg-8 col-md-8 pos-rlv'>
                        <div className = 'card card-body border-0'>
                            <h2 className = 'text-center'>Welcome to MedicalReel</h2>
                            <div className = 'text-center'>Please start adding pictures or documents to add to your reel</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                {
               data.map(item => (
                   
                    <DocItem item = {item}/>
                    ))
                }
            </div>
        )
    }
}

export default HomeScreen
