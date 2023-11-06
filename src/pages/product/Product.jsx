import React from 'react'
import useBase from '~/hooks/useBase'
import { resetFilters } from '~/redux/slice/FiltersSlice'
import { Card, CardBody, CardHeader, CardToolbar } from '~/components/card'
import { SearchStatus, SearchText } from '~/components/filters'
import { OPTION_PAGE } from '~/constants/AppConstant'
import { PATH } from '~/constants/Paths'
import {
    DeleteSelectedProduct, ProductList, TableProduct, useProduct
} from '~/features/product'

const Product = () => {

    const { dispatch, navigate } = useBase();

    const { error, msg, isSelected } = useProduct();

    const handleAddProduct = () => {
        dispatch(resetFilters());
        navigate(PATH.ADD);
    }

    return (
        <Card
            className={!error || !msg.trim() ? '' : 'md:h-full'}
        >
            <CardHeader className={'!text-center !py-5 md:gap-5 gap-2 !border-bottom-card-none'}>
                <SearchText
                    placeholder='Search Product Name'
                />
                <CardToolbar className={'gap-5 justify-end flex-[1_auto] min-w-0'}>
                    {
                        isSelected
                            ? (<DeleteSelectedProduct
                                option={OPTION_PAGE.ENABLED}
                            />)
                            : (
                                <>
                                    <SearchStatus />
                                    <button className='btn btn-primary'
                                        onClick={() => handleAddProduct()}
                                    >
                                        Add Product
                                    </button>
                                </>
                            )
                    }
                </CardToolbar>
            </CardHeader>
            <CardBody className={'!pt-0'}>
                <ProductList
                    option={OPTION_PAGE.ENABLED}
                >
                    <TableProduct option={OPTION_PAGE.ENABLED} />
                </ProductList>
            </CardBody>
        </Card>
    )
}

export default Product