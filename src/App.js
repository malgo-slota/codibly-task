import './index.css';
import React from 'react';
import SearchInput from './components/SearchInput';
import Pagination from './components/Pagination';
import { DataProvider } from './DataContext';
import ProductsTable from './components/ProductsTable';

function App() {

  return (
    <div className="App">
        <DataProvider>
          <SearchInput />
          <ProductsTable />
          <Pagination />
       </DataProvider>
    </div>
  );
}

export default App;
