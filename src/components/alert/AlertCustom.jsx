import React from 'react';
import './AlertCustom.css';

const AlertCustom = ({text, show}) => {
    return (
        <div style={show ? {display: 'block'}: {display: 'none'}} className="alert-container">
            <div className="alert-body">
                <p><i className="fa fa-check-circle"></i></p>
                <p> {text} </p>
                <button type="button" className="btn btn-secondary btn-md mt-2">OK</button>
            </div>
        </div>
    )
}

export default AlertCustom