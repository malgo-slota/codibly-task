import { createContext, useState, useEffect, ReactNode } from 'react';

const DataContext = createContext({} as DataContext); 

type Element = {
    id: number,
    name: string,
    year: number,
    color: string,
    pantone_value: string,
}

type DataProviderProps = {
    children: ReactNode,
}

type DataContext = {
    data: Element[],
    setData: (data: Element[]) => any,
    isLoading: boolean,
    errorStatus: string | null,

    searchInput:  number | undefined,
    setSearchInput: (searchInput: number) => void,

    handleStatus: (response: any, products: any) => void,
    filteredData: (url: string, id: number) => Promise<void>,

    itemsTotal: number,
    perPage: number,
    pageNum: number,
    setPageNum : (pageNum: number) => void,
}

export function DataProvider({ children } : DataProviderProps) {

    const [data, setData] = useState<Element[]>([]);

    const [isLoading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);

    const [searchInput, setSearchInput] = useState<number>();

    const [perPage, setPerPage] = useState(5);
    const [pageNum, setPageNum] = useState(1);
    const [itemsTotal, setItemsTotal] = useState(1);

    const handleStatus = (response: any, products: any) => {
        if(response.status >= 200 && response.status < 300) {;
            setData(products.data);
            setItemsTotal(products.total);
            setLoading(false);
        } else {
            setErrorStatus(response.status);
            setLoading(false);
        } 
    }

    const getAllData = async (
        url = `https://reqres.in/api/products`,
    ) => {
            const dataArray = [];
            const response = await fetch(`${url}`);
            
            const products = await (await fetch(`${url}`)).json();
            const total_pages = products.total_pages;
        
            for(let i = 1; i <= total_pages; i++) {
                dataArray.push(...(await (await fetch(`${url}?page=${i}`)).json()).data);
            }

            handleStatus(response, products);
            setData(dataArray);
            setLoading(false);
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
            filteredData() 
            :
        getAllData();
        setErrorStatus(null);
    },[searchInput, pageNum]);

    return (
        <DataContext.Provider value={{ 
                                        data, 
                                        setData, 
                                        isLoading, 
                                        errorStatus, 
                                        searchInput, 
                                        setSearchInput, 
                                        itemsTotal, 
                                        perPage, 
                                        pageNum, 
                                        setPageNum,
                                        handleStatus,
                                        filteredData, 
                                        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
