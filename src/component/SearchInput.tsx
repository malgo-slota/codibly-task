import React, { useContext } from 'react';
import { HiSearch } from 'react-icons/hi';
import DataContext from '../context/DataContext';
import '../styles/searchInput.scss';

export default function SearchInput () {

   const ALLOWED_INPUTS_CODE = [
      "Digit0", "Digit1", "Digit2", "Digit3", "Digit4",
      "Digit5", "Digit6", "Digit7", "Digit8", "Digit9",
      "Backspace", "Enter"
   ];

   const { searchInput, setSearchInput } = useContext(DataContext);

   const isInputNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
      let key = event.code;
      let isNumber = ALLOWED_INPUTS_CODE.some(item => item === key);
      if(!isNumber)
         event.preventDefault();
   }

  return (
     <div className ="input-wrapper">
         <div>
            <label htmlFor='search-input'>Search by ID</label>
            <input type="text" 
                  name='search-input' 
                  id="search-input"
                  onKeyDown={isInputNumber}
                  value={searchInput === 0 ? "" : searchInput}
                  onChange={(event) => setSearchInput(Number(event.target.value))}
                  />
            <span className="search-icon"><HiSearch /></span>
         </div>
      </div>
  )
}
