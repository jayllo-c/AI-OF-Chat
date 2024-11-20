import React from 'react';
import '../css/Navbar.css'; // Import the CSS file

function Navbar() {
    // Currently the navbar is static and does not have any functionality
    // This is a placeholder for future development
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">OnlyFriends</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Pricing
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/">Premium</a></li>
                        <li><a class="dropdown-item sky-blue-bg"  href="/">VIP</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="/">Subscriptions</a></li>
                    </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Looking for someone?" aria-label="Search"/>
                    <button class="btn custom-button" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;