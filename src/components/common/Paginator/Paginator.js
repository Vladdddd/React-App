import React, {useState} from 'react';
import s from '../../Users/Users.module.css';

let Paginator = ({totalItemsCount, portionSize = 25, ...props}) => {
    let pagesCount = Math.ceil(totalItemsCount / props.pageSize);

    let pages = [];
    for (let index = 1; index <= pagesCount; index++) {
        pages.push(index);

    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
   

    return <div className={s.users}>
        {portionNumber > 1 && 
        <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Left</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
                .map(p => {
                    return <span className={props.currentPage === p && s.selectedPage}
                        onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Right</button>}
        </div>
}

export default Paginator