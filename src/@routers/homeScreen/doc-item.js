import React from 'react'
import './styles.css'
const DocItem = ({item}) => {
    // const carouselItems = () => {
    //     return (
    //         {
    //             data.map()
    //         }
    //     )
    // }
    return (
        <div className = 'container'>
                {(item.files.length > 1) ? 
                <div></div>
                :<div className = 'row justify-content-center align-items-center pos-fiexd'>
                    <div className = 'col-lg-6 col-md-6'>
                        <div className = 'card card-body border-0'>
                            <img className = 'card-img img-responsive' src = {item.files[0]} style = {{
                            display: 'block',
                            maxWidth: '100%',
                            maxHeight : '100px',
                            width : 'auto',
                            height: 'auto',
                        }}></img> 
                        </div>
                    </div>
                <div className = 'col-lg-6 col-md-6 pos-rlv'>
                    <div className = 'card card-body border-0'>
                        <div className = 'text=center'><h2>{item.description}</h2></div>
                    </div>
                </div>
              </div>
            }
        </div>
    )
}

export default DocItem
