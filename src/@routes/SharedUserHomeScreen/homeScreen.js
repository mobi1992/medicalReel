import React, { useState, useEffect } from 'react'
import DocItem from '../../@routes/homeScreen/doc-item'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams } from 'react-router-dom'
import { apis, routePaths } from '../../@services'
const Home = ({ paramData }) => {
    console.log(paramData)
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    // At first paramData array is empty, because setState is asynchronous, but when a value comes in the paramData array, useEffect should be called again, so in the dependency array paramData is added
    useEffect(() => {
        getHomeData();
    }, [paramData]);

    const getHomeData = async () => {
        try {
            setLoading(true)
            if (paramData.length !== 0) {
                const { data: userDocs } = await apis.getUserDoc({ page, userId: paramData });
                console.log(paramData)
                console.log(userDocs);
                setData(userDocs);
            }
            
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
            {data.length === 0 && !loading ?
                <div className='container'>
                </div> : <div>
                    {
                        data.map(item => (

                            <DocItem item={item} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Home
