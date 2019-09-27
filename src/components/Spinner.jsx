import React from "react";
// import { MDBSpinner } from 'mdbreact'; // premium component

const Spinner = () => {
  return (
    <>
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </>
  );
}

export default Spinner;