import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '~/components/card';
import { SearchStatus, SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { CategoryList, DeleteSelectedCategory, ModalFormSubCategory } from '~/features/categories';
import { isSelectedCategorySelector } from '~/redux/selectors';

const SubCategory = () => {

    const refModal = useRef();

    const handleAddSubCategory = () => {
        refModal.current.addSubCategory();
    }

    const handleEditSubCategory = (code) => {
        refModal.current.editSubCategory(code);
    }

    const isSelected = useSelector(isSelectedCategorySelector);

    return (
        <>
            <Card>
                <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                    <SearchText
                        placeholder={"Search Sub Category Name"}
                    />
                    {
                        isSelected ? (
                            <DeleteSelectedCategory option={OPTION_PAGE.SUB} />
                        ) : (
                            <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                                <SearchStatus />
                                <div className='btn btn-primary'
                                    onClick={() => handleAddSubCategory()}
                                >Add Sub Category</div>
                            </div>
                        )
                    }
                </div >
                <CategoryList
                    option={OPTION_PAGE.SUB}
                    onUpdate={handleEditSubCategory}
                />
                < ModalFormSubCategory ref={refModal} />
            </Card>
        </>
    )
}

export default SubCategory;
