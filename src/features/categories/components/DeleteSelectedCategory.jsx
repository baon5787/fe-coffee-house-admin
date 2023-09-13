import React from 'react'
import { useSelector } from 'react-redux';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { getListCodeSelectedCategory } from '~/redux/selectors';
import {
    getDisenableSelectedParentCategories, getDisenableSelectedSubCategories,
    getEnableSelectedCategories, getTitleDisenableSelectedParentCategories,
    getTitleDisenableSelectedSubCategories, getTitleEnableSelectedCategories
} from '../services/ApiCategories';
import { disenable, enable } from '~/helper/AppString';
import { DeleteSelected } from '~/components/table';

const DeleteSelectedCategory = ({ option }) => {

    const codes = useSelector(getListCodeSelectedCategory);

    return (
        <>
            {
                option === OPTION_PAGE.PARENT
                    ? <DeleteSelected
                        option={disenable}
                        listCheckBox={codes}
                        apiTitle={getTitleDisenableSelectedParentCategories}
                        apiDeleteSelected={getDisenableSelectedParentCategories}
                    />
                    : (
                        option === OPTION_PAGE.SUB
                            ? <DeleteSelected
                                option={enable}
                                listCheckBox={codes}
                                apiTitle={getTitleDisenableSelectedSubCategories}
                                apiDeleteSelected={getDisenableSelectedSubCategories}
                            />
                            : (
                                option === OPTION_PAGE.DISENABLE
                                    ? <DeleteSelected
                                        option={enable}
                                        listCheckBox={codes}
                                        apiTitle={getTitleEnableSelectedCategories}
                                        apiDeleteSelected={getEnableSelectedCategories}
                                    /> : ""
                            )
                    )

            }
        </>
    )
}

export default DeleteSelectedCategory;
