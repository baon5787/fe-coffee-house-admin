export const OrdinalNumbers = (index, limit, currentPage) => {
    return (index + 1) + ((currentPage - 1) * limit);
};