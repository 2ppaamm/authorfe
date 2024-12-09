import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
 	   <header className="top-nav">
    	  <div className="left-nav">
            <b>EBIZ Authorade</b>
            <nav>
                <ul>
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/content")}>Content</li>
                    <li onClick={() => navigate("/question-banks")}>Question Banks</li>
                </ul>
            </nav>
          </div>
        </header>
    );
};

export default Navbar;
