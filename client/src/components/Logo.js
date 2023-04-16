import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = ({ size = 'big' }) => {
    return (
        <NavLink to='/' className={size === 'big' ? "text-2xl" : "text-lg"}>
            <h2 className="font-['Unbounded'] text-primary">YOU</h2>
        </NavLink>
    );
};

export default Logo;