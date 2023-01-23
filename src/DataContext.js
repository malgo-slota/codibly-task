import { createContext, useState, useEffect } from 'react';

const DataContext = createContext(); 

export function DataProvider({ children }) {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const [perPage, setPerPage] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [itemsTotal, setItemsTotal] = useState(1);

    const handleStatus = (response, products) => {
        if(response.status >= 200 && response.status < 300) {
            setData(products.data);
            setPerPage(products.per_page);
            setItemsTotal(products.total);
            setLoading(false);
        } else {
            setErrorStatus(response.status);
            setLoading(false);
        } 
    }

    const paginatedData = async (
            url = `https://reqres.in/api/products`,
            page = pageNum,
       ) => {
        const response = await fetch(`${url}?page=${page}`)
        const products = await response.json();
        handleStatus(response, products)
        window.history.pushState({},'',`/page/${pageNum}`);
    };

    const filteredData = async (
            url = `https://reqres.in/api/products`,
            id = searchInput,
       ) => {
        
        const response = await fetch(`${url}/?id=${id}`);
        const products = await response.json();
        handleStatus(response, products);
        window.history.pushState({},'',`/id/${id}`);
    };

    useEffect(() => {
        setLoading(true);
        searchInput ? 
            filteredData() :
            paginatedData()
        setErrorStatus(null);
    },[searchInput, pageNum]);

    return (
        <DataContext.Provider value={{ data, 
                                        setData, 
                                        isLoading, 
                                        errorStatus, 
                                        searchInput, 
                                        setSearchInput, 
                                        itemsTotal, 
                                        perPage, 
                                        pageNum, 
                                        setPageNum 
                                        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
