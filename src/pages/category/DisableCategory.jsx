import React from 'react'
import { Card, CardBody, CardHeader, CardToolbar } from '~/components/card';
import { SearchText } from '~/components/filters';
import { OPTION_PAGE } from '~/constants/AppConstant';
import {
    CategoryList, DeleteSelectedCategory, TableCategory, useCategory
} from '~/features/categories';

const DisableCategory = () => {

    const { error, msg, isSelected } = useCategory();

    return (
        <Card
            className={!error || !msg.trim() ? '' : 'md:h-full'}
        >
            <CardHeader className={'!text-center !py-5 md:gap-5 gap-2 !border-bottom-card-none'}>
                <SearchText
                    placeholder='Tìm kiếm tên vô hiệu danh mục'
                />
                <CardToolbar className={'gap-5 justify-end flex-[1_auto] min-w-0'}>
                    {
                        isSelected && <DeleteSelectedCategory
                            option={OPTION_PAGE.DISENABLE}
                        />
                    }
                </CardToolbar>
            </CardHeader>
            <CardBody className={'!pt-0'}>
                <CategoryList
                    option={OPTION_PAGE.DISENABLE}
                >
                    <TableCategory option={OPTION_PAGE.DISENABLE} />
                </CategoryList>
            </CardBody>
        </Card>
    )
}

export default DisableCategory