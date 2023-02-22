import { useContext, useState } from 'react';
import "../styles/productsTable.scss";
import Row from './Row';
import DataContext from '../context/DataContext';
import LoadingSpinner from '../component/LoadingSpinner';
import Modal from '../component/Modal';

export default function ProductsTable () {

    const { data, setData, isLoading, errorStatus, pageNum, perPage} = useContext(DataContext);
    const [showMore, setShowMore] = useState(false);
    const [index , setIndex] = useState<number>();

    const handleClose = () => {
        setShowMore(false);
    }

    const expandData = (id: number) => {
        setShowMore(!showMore)
        setIndex(id);
    }

    const handleSliceParams = (sliceStart?: number, sliceEnd?: number) => {
        if(data.length > 1) {
            sliceStart = (pageNum - 1) * perPage;
            sliceEnd = pageNum * perPage;
            return [sliceStart, sliceEnd];
        } else {
            return []
        }
    }

    if(isLoading) {
        return (
             <LoadingSpinner />
        );
    } else {
        if(errorStatus) {
            return (
                <div>Error: {errorStatus}</div>
            );
        } else {
            return (
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody> 

                        { !Array.isArray(data) ?
                            setData([data]) :

                            data.slice(...(handleSliceParams())).map((item)=> (
                                <Row key={item.id} 
                                    id={item.id}
                                    name={item.name} 
                                    year={item.year}
                                    color={item.color}
                                    expandData={() => expandData(item.id)}/>
                            ))
                        }

                        </tbody>
                    </table>

                    {showMore ? 
                            data.filter((item) => item.id === index).map((el) =>
                            <Modal key={el.id} 
                                id={el.id}
                                name={el.name} 
                                year={el.year}
                                color={el.color}
                                pantone={el.pantone_value}
                                handleClose={handleClose}
                            />) : 
                        ''
                    }
                </div>
            )
        }
    }
} 