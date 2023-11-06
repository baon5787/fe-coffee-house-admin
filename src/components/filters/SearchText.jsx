import React, { useEffect, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import useDebounce from '~/hooks/useDebounce'
import { Input } from '../form'
import { defaultSearchTextChange, searchTextChange } from '~/redux/slice/FiltersSlice'
import { searchTextSelector } from '~/redux/selectors'


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
        <div className='card-title'>
            <div className='flex relative items-center my-1'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='svg-icon absolute ml-4 lg:w-search-lg lg:h-search-lg w-search h-search' />
                <Input className={'form-control form-control-solid !w-[250px] pl-12'}
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => handleSearchText(e)}
                    value={titleLike}
                />
            </div>
        </div>
    )
}

SearchText.propTypes = {
    placeholder: PropTypes.string.isRequired,
}

export default SearchText