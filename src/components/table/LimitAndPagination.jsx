import React from 'react'
import PropTypes from 'prop-types';
import { Limit, Pagination } from '../filters'

const LimitAndPagination = ({ options, value, totalPage, currentPage }) => {
    return (
        <div className='grid md:grid-cols-[40%_60%]'>
            <div className='flex md:justify-start justify-center p-[1rem_0.75rem] items-center'>
                <Limit
                    options={options}
                    value={value}
                    totalPage={totalPage}
                />
            </div>
            <div className='flex md:justify-end justify-center  px-3 items-center'>
                <div className='p-[1rem_0] ml-2 m-0 whitespace-nowrap text-right'>
                    <Pagination
                        totalPage={totalPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

LimitAndPagination.propTypes = {
    totalPage: PropTypes.number,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
}

export default LimitAndPagination