import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../CSS_Files/For_navbar.css';
import { Link } from 'react-router-dom';

import logo from '../Images/logo.png';


function Navbar() {
    return (
        <div>
            {/* Navbar starts here */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"> <i>PiNacle Coder</i> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            
                            <li className="nav-item dropdown-center dropdown">
                                <button className="nav-link dropdown-toggle-no-caret" type='button'  data-bs-toggle="dropdown" aria-expanded="false">
                                    Support
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item text-center item-1" href="https://github.com/sankalpie"><i className="fas fa-brands fa-github fa-fade"></i> Github</a></li>
                                    <li><a className="dropdown-item text-center item-2" href="https://www.linkedin.com/in/sankalp-pareek-92a473238/"><i className="fa-brands fa-linkedin fa-beat"></i> LinkedIn</a></li>
                                    <li><a className="dropdown-item text-center item-3" href="https://www.instagram.com/sankalpie/"><i className="fa-brands fa-instagram fa-bounce"></i> Instagram</a></li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to='/Features'>Features</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar ends here */}
        </div>
    )
}

export default Navbar