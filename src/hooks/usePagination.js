import { useMemo } from 'react'

export const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ currentPage, totalPage, siblingCount = 1, }) => {

    const paginationRange = useMemo(() => {
        const defaultSiblingPage = 5;
        const totalPageNumbers = siblingCount + defaultSiblingPage;
        if (totalPageNumbers >= totalPage) {
            return range(1, totalPage);
        }

        const minIndex = 1
        const leftSiblingIndex = Math.max(currentPage - siblingCount, minIndex);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPage
        );

        const minDistance = 2
        const shouldShowLeftDots = leftSiblingIndex > minDistance;
        const shouldShowRightDots = rightSiblingIndex < totalPage - minDistance;

        const firstPageIndex = 1;
        const lastPageIndex = totalPage;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = defaultSiblingPage;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPage];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = defaultSiblingPage;
            let rightRange = range(
                totalPage - rightItemCount + 1,
                totalPage
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

    }, [currentPage, totalPage, siblingCount]);

    return paginationRange;
}
