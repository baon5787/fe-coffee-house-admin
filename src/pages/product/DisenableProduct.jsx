import React from 'react'
import { Card, CardBody, CardHeader, CardToolbar } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import {
    DeleteSelectedProduct, ProductList, TableProduct, useProduct
} from '~/features/product';

const DisenableProduct = () => {

    const { error, msg, isSelected } = useProduct();

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
                        isSelected && (<DeleteSelectedProduct
                            option={OPTION_PAGE.DISENABLE}
                        />)
                    }
                </CardToolbar>
            </CardHeader>
            <CardBody className={'!pt-0'}>
                <ProductList
                    option={OPTION_PAGE.DISENABLE}
                >
                    <TableProduct option={OPTION_PAGE.DISENABLE} />
                </ProductList>
            </CardBody>
        </Card>
    )
}

export default DisenableProduct