import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import { CategoryList, DeleteSelectedCategory } from '~/features/categories';
import { isSelectedCategorySelector } from '~/redux/selectors';


const DisableCategory = () => {

    const isSelected = useSelector(isSelectedCategorySelector);

    return (
        <>
            <Card>
                <div className='card-header align-items-center py-5 gap-2 gap-md-5'>
                    <SearchText
                        placeholder={"Search Parent Category Name"}
                    />
                    {
                        isSelected && (
                            <DeleteSelectedCategory option={OPTION_PAGE.DISENABLE} />
                        )
                    }
                </div >
                <CategoryList
                    option={OPTION_PAGE.DISENABLE}
                />
            </Card>
        </>
    )
}

export default DisableCategory;
