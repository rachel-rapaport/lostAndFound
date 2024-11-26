'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Category } from '../types/Category';

export default function GetCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/category')
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      }
      )
      .catch((error) => console.error('Error loading categories:', error));
  }, []);

  return (
    <div className='text-right'>
      <ul>
        {categories && categories.map((category: Category) => (
          <li key={category.id}>
            <h2 className='text-[4vh]'>{category.name}</h2>
            <ul>
              {category.subcategories && category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>{subcategory.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
