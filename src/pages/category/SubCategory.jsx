import React, { useRef } from 'react'
import { Card, CardBody, CardHeader, CardToolbar } from '~/components/card';
import { SearchStatus, SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import {
    CategoryList, DeleteSelectedCategory, ModalFormSubCategory,
    TableCategory, useCategory
} from '~/features/categories';

const SubCategory = () => {

    const refModal = useRef();

    const { error, msg, isSelected } = useCategory();

    const handleAddSubCategory = () => {
        refModal.current.addSubCategory();
    }

    const handleEditSubCategory = (code) => {
        refModal.current.editSubCategory(code);
    }

    return (
        <>
            <Card
                className={!error || !msg.trim() ? '' : 'md:h-full'}
            >
                <CardHeader className={'!text-center !py-5 md:gap-5 gap-2 !border-bottom-card-none'}>
                    <SearchText
                        placeholder='Tìm kiếm tên danh mục con'
                    />
                    <CardToolbar className={'gap-5 justify-end flex-[1_auto] min-w-0'}>
                        {
                            isSelected
                                ? (<DeleteSelectedCategory
                                    option={OPTION_PAGE.SUB}
                                />)
                                : (
                                    <>
                                        <SearchStatus />
                                        <button className='btn btn-primary'
                                            onClick={() => handleAddSubCategory()}
                                        >
                                            Thêm danh mục con
                                        </button>
                                    </>
                                )
                        }
                    </CardToolbar>
                </CardHeader>
                <CardBody className={'!pt-0'}>
                    <CategoryList
                        option={OPTION_PAGE.SUB}
                    >
                        <TableCategory option={OPTION_PAGE.SUB}
                            onUpdate={handleEditSubCategory}
                        />
                    </CategoryList>
                </CardBody>
            </Card>
            < ModalFormSubCategory ref={refModal} />
        </>
    )
}

export default SubCategory