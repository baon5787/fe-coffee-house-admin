import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import { searchTextSelector } from '~/redux/selectors';
import { defaultSearchTextChange, searchTextChange } from '~/redux/slice/FiltersSlice';
import PropTypes from 'prop-types';
import { SearchIcon } from '../icons';

const SearchText = ({ placeholder }) => {

    const dispatch = useDispatch();

    const filters = useSelector(searchTextSelector);

    const [titleLike, setTitleLike] = useState(filters ? filters : "")

    const debouncedValue = useDebounce(titleLike, 700);

    useEffect(() => {
        const handle = () => {
            if (filters === titleLike) return;
            filters ? setTitleLike(filters) : setTitleLike("");
        }
        handle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    useEffect(() => {
        if (!debouncedValue.trim()) {
            if (!filters) return;
            if (!titleLike.trim()) {
                dispatch(defaultSearchTextChange());
                return;
            }
        }

        const sreachApi = () => {
            dispatch(searchTextChange(debouncedValue));
        }
        sreachApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])

    const handleSearchText = (e) => {
        setTitleLike(e.target.value);
    }

    return (
        <>
            <div className='card-title'>
                <div className='d-flex align-items-center position-relative my-1'>
                    <span className='svg-icon svg-icon-3 position-absolute ms-4'>
                        <SearchIcon size={18} />
                    </span>
                    <input className='form-control form-control-solid w-250px ps-15'
                        type="text"
                        placeholder={placeholder}
                        onChange={(e) => handleSearchText(e)}
                        value={titleLike}
                    />
                </div>
            </div>
        </>
    )
}

SearchText.propTypes = {
    placeholder: PropTypes.string.isRequired,
}

export default SearchText;
