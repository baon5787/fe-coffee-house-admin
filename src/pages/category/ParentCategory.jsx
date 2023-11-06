import React, { useRef } from 'react'
import { Card, CardBody, CardHeader, CardToolbar } from '~/components/card';
import { SearchStatus, SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import {
    CategoryList, DeleteSelectedCategory, ModalFormParentCategory,
    TableCategory, useCategory
} from '~/features/categories';


const ParentCategory = () => {

    const refModal = useRef();

    const { error, msg, isSelected } = useCategory();

    const handleAddParentCategory = () => {
        refModal.current.addParentCategory();
    }

    const handleEditParentCategory = (code) => {
        console.log(code);
        refModal.current.editParentCategory(code);
    }

    return (
        <>
            <Card
                className={!error || !msg.trim() ? '' : 'md:h-full'}
            >
                <CardHeader className={'!text-center !py-5 md:gap-5 gap-2 !border-bottom-card-none'}>
                    <SearchText
                        placeholder='Tìm kiếm tên danh mục chính'
                    />
                    <CardToolbar className={'gap-5 justify-end flex-[1_auto] min-w-0'}>
                        {
                            isSelected
                                ? (<DeleteSelectedCategory
                                    option={OPTION_PAGE.PARENT}
                                />)
                                : (
                                    <>
                                        <SearchStatus />
                                        <button className='btn btn-primary'
                                            onClick={() => handleAddParentCategory()}
                                        >
                                            Thêm danh mục chính
                                        </button>
                                    </>
                                )
                        }
                    </CardToolbar>
                </CardHeader>
                <CardBody className={'!pt-0'}>
                    <CategoryList
                        option={OPTION_PAGE.PARENT}
                    >
                        <TableCategory option={OPTION_PAGE.PARENT}
                            onUpdate={handleEditParentCategory}
                        />
                    </CategoryList>
                </CardBody>
            </Card>
            < ModalFormParentCategory ref={refModal} />
        </>
    )
}

export default ParentCategory