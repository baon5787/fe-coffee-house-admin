import React from 'react'
import { useSelector } from 'react-redux';
import { DeleteSelected } from '~/components/table';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { disenable, enable } from '~/helper/AppString';
import { getListSkuSelectedProduct } from '~/redux/selectors';
import { getDisenableSelectedProducts, getEnableSelectedProducts, getTitleDisenableSelectedProducts, getTitleEnableSelectedProducts } from '../services/ApiProduct';

const DeleteSelectedProduct = ({ option }) => {

    const skus = useSelector(getListSkuSelectedProduct);

    return (
        <>
            {
                option === OPTION_PAGE.ENABLED
                    ? <DeleteSelected
                        option={disenable}
                        listCheckBox={skus}
                        apiTitle={getTitleDisenableSelectedProducts}
                        apiDeleteSelected={getDisenableSelectedProducts}
                    />
                    : (
                        option === OPTION_PAGE.DISENABLE
                            ? <DeleteSelected
                                option={enable}
                                listCheckBox={skus}
                                apiTitle={getTitleEnableSelectedProducts}
                                apiDeleteSelected={getEnableSelectedProducts}
                            /> : ""
                    )

            }
        </>
    )
}

export default DeleteSelectedProduct;
