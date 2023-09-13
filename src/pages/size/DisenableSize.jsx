import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardFilter } from '~/components/card'
import { SearchText } from '~/components/filters'
import { OPTION_PAGE } from '~/constants/AppConstant'
import { DeleteSelectedSize, SizeList } from '~/features/size'
import { getErrorSize, isSelectedSizeSelector } from '~/redux/selectors'

const DisenableSize = () => {

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
                    {
                        isSelected && (
                            <div className='card-toolbar flex-row-fluid justify-content-end gap-5'>
                                <DeleteSelectedSize
                                    option={OPTION_PAGE.DISENABLE}
                                />
                            </div>
                        )
                    }
                </CardFilter>
                <SizeList
                    option={OPTION_PAGE.DISENABLE}
                />
            </Card>
        </>
    )
}

export default DisenableSize