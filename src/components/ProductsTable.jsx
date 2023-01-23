import React, { useContext, useState } from 'react';
import "./productsTable.scss";
import Row from './Row';
import DataContext from '../DataContext';
import LoadingSpinner from './LoadingSpinner';
import Modal from './Modal';

export default function ProductsTable () {

    const { data, setData, isLoading, errorStatus } = useContext(DataContext);
    const [showMore, setShowMore] = useState(false);
    const [index , setIndex] = useState('');

    const handleClose = () => {
        setShowMore(false);
    }

    const expandData = (id) => {
        setShowMore(!showMore)
        setIndex(id.id);
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
                            {!Array.isArray(data) ? setData([data]) :
                                data.map(item => 
                                    <Row key={item.id} 
                                        id={item.id}
                                        name={item.name} 
                                        year={item.year}
                                        color={item.color}
                                        pantone={item.pantone_value}
                                        expandData={expandData}
                                    /> 
                            )}
                        </tbody>
                    </table>

                    {showMore ? 
                            data.filter(item => item.id === index).map((el)=>
                            <Modal key={el.id} 
                                id={el.id}
                                name={el.name} 
                                year={el.year}
                                color={el.color}
                                pantone={el.pantone_value}
                                expandData={expandData}
                                handleClose={handleClose}
                            />) : 
                        ''
                    }
                </div>
            )
        }
    }
} 
        
    

