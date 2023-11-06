import React from 'react'
import { useSelector } from 'react-redux'
import {
    getDisenableSelectedParentCategories, getDisenableSelectedSubCategories,
    getEnableSelectedCategories, getTitleDisenableSelectedParentCategories,
    getTitleDisenableSelectedSubCategories, getTitleEnableSelectedCategories
} from '../services/ApiCategories'
import { DeleteSelected } from '~/components/table'
import { OPTION_PAGE } from '~/constants/AppConstant'
import { disenable, enable } from '~/helper/AppString'
import { getListCodeSelectedCategory } from '~/redux/selectors'

const DeleteSelectedCategory = ({ option }) => {

    const codes = useSelector(getListCodeSelectedCategory);

    if (option === OPTION_PAGE.PARENT) {
        return (
            <DeleteSelected
                option={disenable}
                listCheckBox={codes}
                apiTitle={getTitleDisenableSelectedParentCategories}
                apiDeleteSelected={getDisenableSelectedParentCategories}
            />
        )
    }

    if (option === OPTION_PAGE.SUB) {
        return (
            <DeleteSelected
                option={enable}
                listCheckBox={codes}
                apiTitle={getTitleDisenableSelectedSubCategories}
                apiDeleteSelected={getDisenableSelectedSubCategories}
            />
        )
    }

    return (
        option === OPTION_PAGE.DISENABLE && (
            <DeleteSelected
                option={enable}
                listCheckBox={codes}
                apiTitle={getTitleEnableSelectedCategories}
                apiDeleteSelected={getEnableSelectedCategories}
            />
        )
    )
}

export default DeleteSelectedCategory