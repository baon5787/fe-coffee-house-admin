import React from 'react'
import { LeftDirectionIcon, RightDirectionIcon, StraightIcon } from '~/components/icons/Icons';


const IconDirection = ({ title }) => {
    return (
        <>
            {
                title.includes('phải') ? (
                    <RightDirectionIcon />
                ) : (
                    title.includes('trái') ? (
                        <LeftDirectionIcon />
                    ) : (
                        <StraightIcon />
                    )
                )
            }
        </>
    )
}

export default IconDirection;
