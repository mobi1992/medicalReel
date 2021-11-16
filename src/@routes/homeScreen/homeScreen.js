import React from 'react'
import DocItem from './doc-item'
import './index.css'
const Home = ({data, loading}) => {
    
    return (
        <div>
            {data.length === 0 && !loading ?
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='mt-5 col-lg-8 col-md-8'>
                            <div className='card card-body border-0'>
                                <h2 className='text-center'>Welcome to MedicalReel</h2>
                                <div className='text-center'>Please start adding pictures or documents to add to your reel</div>
                            </div>
                        </div>
                    </div>
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
