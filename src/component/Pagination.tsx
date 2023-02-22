import { useContext } from 'react';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';
import DataContext from '../context/DataContext';
import '../styles/pagination.scss';

 export default function Pagination () {
  
  const { data, perPage, pageNum, setPageNum, itemsTotal } = useContext(DataContext);

  const pageCount = Math.ceil(itemsTotal / perPage);

  const handleNext = () => {
    if(pageNum < pageCount) {
      setPageNum(pageNum+1);
    }
    else
      console.log(pageNum + ' last page');
  };

  const handlePrev = () => {
    if(pageNum > 0) {
      setPageNum(pageNum-1);
    }
    else
      console.log(pageNum + ' first page');
  };

  return (
    <div>
      <div className={`pagination ${data.length===1 ? 'hide' : ''}`}>
          <button onClick={handlePrev} 
                  disabled={pageNum===1 ? true : false}
                  aria-label="previous page">
                <HiArrowSmLeft/>
          </button>
          <button onClick={handleNext}
                  disabled={pageNum===pageCount ? true : false}
                  aria-label="next page">
                <HiArrowSmRight/>
          </button>
      </div>
    </div>
  );
}
