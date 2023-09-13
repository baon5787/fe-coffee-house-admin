import React from 'react'
import { useSelector } from 'react-redux';
import { DeleteSelected } from '~/components/table';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { disenable, enable } from '~/helper/AppString';
import { getListCodeSelectedSize } from '~/redux/selectors';
import { getDisenableSelectedSizes, getEnableSelectedSizes, getTitleDisenableSelectedSize, getTitleEnableSelectedSizes } from '../services/ApiSize';

const DeleteSelectedSize = ({ option }) => {

    const codes = useSelector(getListCodeSelectedSize);

    return (
        <>
            {
                option === OPTION_PAGE.ENABLED
                    ? <DeleteSelected
                        option={disenable}
                        listCheckBox={codes}
                        apiTitle={getTitleDisenableSelectedSize}
                        apiDeleteSelected={getDisenableSelectedSizes}
                    />
                    : <DeleteSelected
                        option={enable}
                        listCheckBox={codes}
                        apiTitle={getTitleEnableSelectedSizes}
                        apiDeleteSelected={getEnableSelectedSizes}
                    />
            }
        </>
    )
}

export default DeleteSelectedSize
