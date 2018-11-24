import React from 'react'
import '../../styles/preloader.css'

export const Preloader = ({ loading }) => {
    if (!loading) return null;
    return (
        <div className="preloader">
            {loading && <p>Loading &hellip;</p>}
        </div>
    );
};
