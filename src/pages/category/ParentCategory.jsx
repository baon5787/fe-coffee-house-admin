import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '~/components/card';
import { SearchStatus, SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { CategoryList, DeleteSelectedCategory, ModalFormParentCategory } from '~/features/categories';
import { errorCategorySelector, isSelectedCategorySelector, titleErrorCategorySelector } from '~/redux/selectors';

const ParentCategory = () => {

    const refModal = useRef();

    const handleAddParentCategory = () => {
        refModal.current.addParentCategory();
    }

    const handleEditParentCategory = (code) => {
        refModal.current.editParentCategory(code);
    }

    const error = useSelector(errorCategorySelector);

    const msg = useSelector(titleErrorCategorySelector);

    const isSelected = useSelector(isSelectedCategorySelector);

    return (
        <>
            <Card
                className={!error || !msg.trim() ? '' : 'h-md-100'}
            >
                {
                    !error || !msg.trim() ? (
                        <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                            <SearchText
                                placeholder={"Search Parent Category Name"}
                            />
                            {
                                isSelected ? (
                                    <DeleteSelectedCategory option={OPTION_PAGE.PARENT} />
                                ) : (
                                    <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                                        <SearchStatus />
                                        <div className='btn btn-primary'
                                            onClick={() => handleAddParentCategory()}
                                        >Add Parent Category</div>
                                    </div>
                                )
                            }
                        </div >
                    ) : ''
                }
                <CategoryList
                    option={OPTION_PAGE.PARENT}
                    onUpdate={handleEditParentCategory}
                />
            </Card >

            < ModalFormParentCategory ref={refModal} />
        </>
    )
}

export default ParentCategory;
