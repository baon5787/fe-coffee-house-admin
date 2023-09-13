import React from 'react'
import { useDispatch } from 'react-redux';
import { DEFAULT_PAGINATION, MIN_PAGE, MIN_PAGINATION } from '~/constants/AppConstant';
import { DOTS, usePagination } from '~/hooks/usePagination';
import { pageFilterChange } from '~/redux/slice/FiltersSlice';

const Pagination = props => {

    const { totalPage, currentPage, siblingCount = 1 } = props;

    const dispatch = useDispatch();

    const handlePageChange = (newPage) => dispatch(pageFilterChange(newPage));

    const paginationRange = usePagination({
        currentPage,
        totalPage,
        siblingCount,
    });

    if (currentPage === MIN_PAGE || !paginationRange || paginationRange.length < MIN_PAGINATION) {
        return null;
    }

    return (
        <>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                <div className='dataTables_paginate paging_simple_numbers'>
                    <ul className='pagination'>
                        {
                            currentPage === DEFAULT_PAGINATION.PAGE ? (
                                <li className='paginate_button page-item previous disabled'>
                                    <div className='page-link'><i className='previous'></i></div>
                                </li>
                            ) : (
                                <li className='paginate_button page-item previous bg-hover-body'>
                                    <div className='page-link'
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    ><i className='previous'></i></div>
                                </li>
                            )
                        }

                        {
                            paginationRange.map((pageNumber, index) => {
                                if (pageNumber === DOTS) {
                                    return (
                                        <li className='paginate_button page-item' key={index}>
                                            <div className='page-link'>&#8230;</div>
                                        </li>
                                    );
                                }
                                if (pageNumber === currentPage) {
                                    return (
                                        <li className='paginate_button page-item active' key={index}>
                                            <div className='page-link'>{pageNumber}</div>
                                        </li>
                                    )
                                }
                                return (
                                    <li className='paginate_button page-item bg-hover-body' key={index}>
                                        <div className='page-link'
                                            onClick={() => handlePageChange(pageNumber)}
                                        >{pageNumber}</div>
                                    </li>
                                )
                            })
                        }
                        {
                            totalPage === currentPage ? (
                                <li className='paginate_button page-item next disabled'>
                                    <div className='page-link'><i className='next'></i></div>
                                </li>
                            ) : (
                                <li className='paginate_button page-item next bg-hover-body'>
                                    <div className='page-link'
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    ><i className='next'></i></div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Pagination;
