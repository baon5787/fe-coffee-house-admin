export const setErrorSizeForm = (data, setError) => {
    data?.name && setError('name', {
        type: "size",
        message: data?.name
    })

    data?.code && setError('code', {
        type: "size",
        message: data?.code
    })

    data?.price && setError('price', {
        type: "size",
        message: data?.price
    })
}