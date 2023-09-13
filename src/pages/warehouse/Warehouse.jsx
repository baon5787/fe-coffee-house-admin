import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Card, CardFilter } from '~/components/card';
import { SearchText } from '~/components/filters';
import { ModalFormWarehouse, WarehouseList } from '~/features/warehouse';
import { getErrorWarehouse } from '~/redux/selectors';

const Warehouse = () => {
    const refModal = useRef();

    const handleEdit = (param) => {
        refModal.current.editWarehouse(param);
    }

    const error = useSelector(getErrorWarehouse);

    return (
        <>
            <Card
                className={error?.isError ? 'h-md-100' : ''}
            >
                <CardFilter
                    isError={error?.isError}
                >
                    <SearchText
                        placeholder={"Search Warehouse Name"}
                    />
                </CardFilter>
                <WarehouseList
                    onUpdate={handleEdit}
                />
            </Card >
            {
                error?.isError ? '' : <ModalFormWarehouse ref={refModal} />
            }
        </>
    )
}

export default Warehouse;
