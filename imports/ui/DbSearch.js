import React, { Component } from 'react';

const DbSearch = ({submitForm, inputChange}) => {
    return (
        <React.Fragment>     
            <label>
            <h2>Sök ras</h2>
                Ras:
                <input 
                type="text" 
                name="catRace" 
                autoComplete="off"
                className="sub-search" 
                onChange={(event) => inputChange('catSearch', event)} 
                />
                <button onClick={submitForm}>Sök</button>
            </label>
            
        </React.Fragment>
    );
} 
export default DbSearch