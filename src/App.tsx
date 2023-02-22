import Pagination from "./component/Pagination";
import ProductsTable from "./component/ProductsTable"
import SearchInput from "./component/SearchInput"
import { DataProvider } from "./context/DataContext"
import './index.css';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <SearchInput />
        <ProductsTable />
        <Pagination />
      </DataProvider>
    </div>
  )
}

export default App
