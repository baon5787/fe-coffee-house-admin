import React from 'react'
import { useSelector } from 'react-redux';
import { Card } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { DeleteSelectedProduct, ProductList } from '~/features/product';
import { errorProductSelector, isSelectedProductsSelector, titleErrorProductSelector } from '~/redux/selectors';

const DisenableProduct = () => {

    const isSelected = useSelector(isSelectedProductsSelector);

    const error = useSelector(errorProductSelector);

    const msg = useSelector(titleErrorProductSelector);

    return (
        <>
            <Card
                className={!error || !msg.trim() ? '' : 'h-md-100'}
            >
                {
                    !error || !msg.trim() ? (
                        <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                            <SearchText
                                placeholder={"Search Product Name"}
                            />
                            {
                                isSelected && (
                                    <DeleteSelectedProduct option={OPTION_PAGE.DISENABLE} />
                                )
                            }
                        </div>
                    ) : ''
                }
                <ProductList
                    option={OPTION_PAGE.DISENABLE}
                />
            </Card>
        </>
    )
}

export default DisenableProduct;
