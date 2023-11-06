import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux';
import { DEFAULT_FILTERS, DOTS, MIN_PAGE, MIN_PAGINATION } from '~/constants/AppConstant';
import { usePagination } from '~/hooks/usePagination';
import { pageFilterChange } from '~/redux/slice/FiltersSlice';
import PropTypes from 'prop-types';

const Pagination = ({ totalPage, currentPage, siblingCount = 1 }) => {

    const dispatch = useDispatch();

    const handlePageChange = (newPage) => dispatch(pageFilterChange(newPage));

    const paginationRange = usePagination({
        currentPage,
        totalPage,
        siblingCount,
    });

    if (currentPage === MIN_PAGE || !paginationRange ||
        paginationRange?.length < MIN_PAGINATION) {
        return;
    }

    return (
        <ul className='pagination'>
            <li className={`group paginate_button page-item ${currentPage === DEFAULT_FILTERS.page ? 'disabled' : null}`}
                onClick={() => currentPage === DEFAULT_FILTERS.page
                    ? null
                    : handlePageChange(currentPage - DEFAULT_FILTERS.page)
                }
            >
                <span className='page-link'>
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        rotation={270}
                        className='w-[0.875rem] h-[0.875rem]'
                    />
                </span>
            </li>
            {
                paginationRange.map((pageNumber, index) => {
                    return (
                        <li className={`group paginate_button page-item ${pageNumber === currentPage ? 'active' : null}`}
                            key={index}
                            onClick={() => pageNumber === DOTS || pageNumber === currentPage
                                ? null
                                : handlePageChange(pageNumber)
                            }
                        >
                            <span className='page-link'>
                                {
                                    pageNumber === DOTS ? '&#8230;' : pageNumber
                                }
                            </span>
                        </li>
                    )
                })
            }
            <li className={`group paginate_button page-item ${currentPage === totalPage ? 'disabled' : null}`}
                onClick={() => currentPage === totalPage
                    ? null
                    : handlePageChange(currentPage + DEFAULT_FILTERS.page)
                }
            >
                <span className='page-link'>
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        rotation={90}
                        className='w-[0.875rem] h-[0.875rem]'
                    />
                </span>
            </li>
        </ul>
    )
}

Pagination.propTypes = {
    totalPage: PropTypes.number,
    currentPage: PropTypes.number,
    siblingCount: PropTypes.number,
}

export default Pagination