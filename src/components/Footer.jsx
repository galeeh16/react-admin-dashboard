import React from "react";
import { MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="#1c2331 mdb-color darken-4" className="font-small pt-2 mt-4">
      <div className=" container-fluid text-center py-3">
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.inarts.co.id"> INARTS </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;