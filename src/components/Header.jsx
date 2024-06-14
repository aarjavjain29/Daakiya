import React from 'react'

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <a className="navbar-brand" href="/">PostMaster</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                        </li> 
                        <li className="nav-item">
                            <a className="nav-link" href="/">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Contact us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
