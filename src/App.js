import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchStates = async () => {
    const res = await axios.get('states.json');
    return res.data;
};

function App() {
    const [states, setStates] = useState([]);
    const [filteredStates, setFilteredStates] = useState([]);
    const [input, setInput] = useState('');

    const getStates = async () => {
        try {
            setStates(await fetchStates());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStates();
    }, [input]);

    const searchStates = input => {
        setInput(input);
        if (input) {
            setFilteredStates(states.filter(state => {
                const regex = new RegExp(`^${input}`, 'gi');
                return state.name.match(regex) || state.abbr.match(regex);
            }));
        } else {
            setFilteredStates([]);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 m-auto'>
                    <h3 className='text-center mb-3' style={{ color: '#fff', fontSize: 38 }}>
                        <i className='fas fa-flag-usa'></i> State Capital Lookup
                    </h3>
                    <div className='form-group mb-1'>
                        <input
                            type='text'
                            id='search'
                            className='form-control form-control-lg'
                            placeholder='Enter state name or abbreviation...'
                            autoComplete='off'
                            onChange={(e) => searchStates(e.target.value)} />
                    </div>
                    <div>
                        {filteredStates.length > 0 && filteredStates.map((match, idx) =>
                            <div className='card card-body mb-1' key={idx}>
                                <h4>{match.name} ({match.abbr}) <span className='text-primary'>{match.capital}</span></h4>
                                <small>Lat: {match.lat} / Long {match.long}</small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;