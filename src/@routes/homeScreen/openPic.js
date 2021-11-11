import React from 'react'
import ReactDOM from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/fontawesome-free-solid'
const OpenPic = ({onClosePic, item}) => {
    return ReactDOM.createPortal(
        <div className = 'row justify-content-center align-items-center' style = {{
            position: 'fixed',
            top : '0px',
            bottom : '0px',
            left : '0px',
            right : '0px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }} onClick = {onClosePic}>
            <div className = 'col-lg-4 col-md-8 col-sm-11 col-11'
            style = {{
                position : 'relative'
            }}>
                <div onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                     e.stopPropagation();
                    }}>
                    <span><FontAwesomeIcon onClick = {onClosePic} style = {{
                        position : 'absolute',
                        top : '0px',
                        bottom : '0px',
                        right : '2vh'
                        }}icon = {faTimesCircle}/></span>
                    <img className = "card-img img-responsive" src={item.files[0]} alt="Card image"/>  
                </div>
            </div>
        </div>,
        document.getElementById("portal-root")
    )
}

export default OpenPic
