import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Card, CardFilter } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { DeleteSelectedSize, ModalFormSize, SizeList } from '~/features/size';
import { getErrorSize, isSelectedSizeSelector } from '~/redux/selectors';

const Size = () => {

    const refModal = useRef();

    const handleAdd = () => {
        refModal.current.addSize();
    }

    const handleEdit = (code) => {
        refModal.current.editSize(code);
    }

    const error = useSelector(getErrorSize);

    const isSelected = useSelector(isSelectedSizeSelector);

    return (
        <>
            <Card
                className={error?.isError ? 'h-md-100' : ''}
            >
                <CardFilter
                    isError={error?.isError}
                >
                    <SearchText
                        placeholder={"Search Size Name"}
                    />
                    <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                        {
                            isSelected ? (
                                <DeleteSelectedSize
                                    option={OPTION_PAGE.ENABLED}
                                />
                            ) : (
                                <div className='btn btn-primary'
                                    onClick={() => handleAdd()}
                                >Add Size</div>
                            )
                        }
                    </div>
                </CardFilter>
                <SizeList
                    option={OPTION_PAGE.ENABLED}
                    onUpdate={handleEdit}
                />
            </Card>
            {
                error?.isError ? '' : <ModalFormSize ref={refModal} />
            }
        </>
    )
}

export default Size;
