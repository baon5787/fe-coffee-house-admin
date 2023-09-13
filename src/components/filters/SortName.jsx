import React from 'react'
import { useDispatch } from 'react-redux';
import { SORT_DIR } from '~/constants/AppConstant';
import { sortName } from '~/redux/slice/FiltersSlice';
import PropTypes from 'prop-types';

const SortName = ({ sortDir, sortField, name, className, title, sortFilter, setSortFilter }) => {

  const dispatch = useDispatch();

  const handleSortName = () => {
    let sortDirName;

    if (!sortFilter) {
      sortDirName = SORT_DIR.ASC;
    } else {
      sortDirName = sortFilter === SORT_DIR.ASC ? SORT_DIR.DESC : SORT_DIR.ASC;
    }

    dispatch(sortName({
      sortField: name,
      sortDir: sortDirName
    }))
    setSortFilter(sortDirName);
  }

  return (
    <th className={
      `${className} ${sortField === name
        ? sortDir === SORT_DIR.ASC ? 'sorting_asc' : 'sorting_desc'
        : 'cursor-pointer'}`
    }
      onClick={() => handleSortName()}
    >
      {title}
    </th>
  )
}

SortName.propTypes = {
  sortDir: PropTypes.oneOf([SORT_DIR.ASC, SORT_DIR.DESC]),
  sortField: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sortFilter: PropTypes.oneOf([SORT_DIR.ASC, SORT_DIR.DESC]),
  setSortFilter: PropTypes.func.isRequired,
}

export default SortName
