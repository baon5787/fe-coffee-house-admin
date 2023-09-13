import React from 'react'
import { Limit, Pagination } from '../filters';

const LimitAndPagination = ({ options, value, totalPage, currentPage, }) => {
    return (
        <div className='row'>
            <Limit options={options}
                value={value}
                totalPage={totalPage}
            />
            <Pagination totalPage={totalPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default LimitAndPagination;
