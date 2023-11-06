import React from 'react'
import { Card, CardBody, CardHeader, CardToolbar } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { DeleteSelectedSize, SizeList, TableSize, useSize } from '~/features/size';

const Size = () => {

    const { error, isSelected } = useSize();

    return (
        <>
            <Card
                className={error ? '' : 'md:h-full'}
            >
                {
                    !error && (
                        <CardHeader className={'!text-center !py-5 md:gap-5 gap-2 !border-bottom-card-none'}>
                            <SearchText
                                placeholder='Tìm kiếm tên danh mục con'
                            />
                            <CardToolbar className={'gap-5 justify-end flex-[1_auto] min-w-0'}>
                                {
                                    isSelected
                                        ? (<DeleteSelectedSize
                                            option={OPTION_PAGE.ENABLED}
                                        />)
                                        : (
                                            <button className='btn btn-primary'
                                            // onClick={() => handleAddSubCategory()}
                                            >
                                                Thêm danh mục con
                                            </button>
                                        )
                                }
                            </CardToolbar>
                        </CardHeader>
                    )
                }
                <CardBody className={'!pt-0'}>
                    <SizeList
                        option={OPTION_PAGE.ENABLED}
                    >
                        <TableSize
                            option={OPTION_PAGE.ENABLED}
                        // onUpdate={handleEdit}
                        />
                    </SizeList>
                </CardBody>
            </Card>
        </>
    )
}

export default Size