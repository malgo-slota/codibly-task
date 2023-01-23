import React, { useContext } from 'react';
import { HiSearch } from 'react-icons/hi';
import DataContext from '../DataContext';
import './searchInput.scss';

export default function SearchInput () {

   const { searchInput, setSearchInput } = useContext(DataContext);

   const isInputNumber = (e) => {
      let key = e.which || e.keyCode;
      if(key && (key <= 47 || key >= 58) && key !== 8 && key !== 37 && key !== 39){
         e.preventDefault();
      }
   }

  return (
     <div className ="input-wrapper">
         <div>
            <label htmlFor='search-input'>Search by ID</label>
            <input type="text" 
                  name='search-input' 
                  id="search-input"
                  onKeyDown={isInputNumber}
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput} 
                  />
            <span className="search-icon"><HiSearch /></span>
         </div>
      </div>
  )
}
