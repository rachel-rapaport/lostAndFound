'use client'
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

export default function GetCities() {
    const [cities, setCities] = useState<{ name: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState<{ name: string }[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/city')
            .then((response) => {
                setCities(response.data);
                console.log(response.data);
            }
            )
            .catch((error) => console.error('Error fetching cities:', error));
    }, []);


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setFilteredCities([]);
            return;
        }
        const filtered = cities.filter(city =>
            city.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCities(filtered);
    };


    return (
        <>
            <div>
                <input type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder='חפש עיר...'
                    className='w-full p-[8px]' />
                <ul className='list-none p-0'>
                    {filteredCities.map((city: { name: string }, index) => (
                        <li key={index} className='p-[5px] cursor-pointer' onClick={() => setSearchTerm(city.name)}>{city.name}</li>))}</ul>
            </div>
        </>
    );
}
