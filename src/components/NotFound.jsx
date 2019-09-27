import React, { Component } from 'react';
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

export class NotFound extends Component {
    render() {
        return (
            <div className="purple-gradient" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <div className="text-center" style={{  width: '100%', height: '100%', margin: 'auto', marginTop: '200px' }}>
                    <h1 style={{ fontWeight: '700', fontSize: '77px', fontFamily: 'sans-serif', color: '#330d4a' }}>404 :(</h1>
                    <h1 style={{ color: '#330d4a' }}>OOPS! Page Not Found</h1>
                </div>
            </div>
        )
    }
}
        
export default NotFound