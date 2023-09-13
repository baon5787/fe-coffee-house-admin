import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '~/components/card';
import { SearchStatus, SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { PATH } from '~/constants/Paths';
import { DeleteSelectedProduct, ProductList } from '~/features/product';
import { errorProductSelector, isSelectedProductsSelector, titleErrorProductSelector } from '~/redux/selectors';
import { resetFilters } from '~/redux/slice/FiltersSlice';

const Product = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddProduct = () => {
        dispatch(resetFilters());
        navigate(PATH.ADD);
    }

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
                                isSelected ? (
                                    <DeleteSelectedProduct option={OPTION_PAGE.ENABLED} />
                                ) : (
                                    <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                                        <SearchStatus />
                                        <div className='btn btn-primary' onClick={() => handleAddProduct()}>
                                            Add Product
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ) : ''
                }
                <ProductList
                    option={OPTION_PAGE.ENABLED}
                />
            </Card>
        </>
    )
}

export default Product;
