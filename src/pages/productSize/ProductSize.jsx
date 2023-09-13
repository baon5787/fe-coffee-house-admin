import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '~/components/card';
import { SearchText } from '~/components/filters';
import { ModalFormProductSize, ProductSizeList } from '~/features/productSize';
import { errorProductSizeSelector, titleErrorProductSizeSelector } from '~/redux/selectors';

const ProductSize = () => {

    const refModal = useRef();

    const handleEdit = (param) => {
        refModal.current.editProductSize(param);
    }

    const error = useSelector(errorProductSizeSelector);

    const msg = useSelector(titleErrorProductSizeSelector);

    return (
        <>
            <Card
                className={!error || !msg.trim() ? '' : 'h-md-100'}
            >
                {
                    !error || !msg.trim() ? (
                        <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                            <SearchText
                                placeholder={"Search Warehouse Name"}
                            />
                        </div>
                    ) : ''
                }
                <ProductSizeList
                    onUpdate={handleEdit}
                />

            </Card >
            {
                !error || !msg.trim() ? <ModalFormProductSize ref={refModal} /> : ''
            }
        </>
    )
}

export default ProductSize;
