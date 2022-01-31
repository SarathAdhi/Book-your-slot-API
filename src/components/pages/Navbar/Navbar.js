import React from 'react';
import './navbar.css';

function Navbar() {
    return (
        <div className='header'>
            <div className='header-container'>
                <div className='navbar'>
                    <li><a href=''>Courses</a></li>
                    <li><a href=''>Available Slot</a></li>
                    <li><a href=''>Book Slot</a></li>
                    <li><a href=''>Contact Us</a></li>
                </div>
            </div>
        </div>
    );
}

export default Navbar;