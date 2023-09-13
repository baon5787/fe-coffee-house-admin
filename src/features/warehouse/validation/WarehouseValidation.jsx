import * as Yup from 'yup';

export const InitialWarehouseUpdate = (warehouse) => {
    return {
        productName: warehouse?.productName,
        sizeName: warehouse?.sizeName,
        quantity: warehouse?.quantity,
    }
}

export const setErrorWarehouseForm = (data, setError) => {
    data?.quantity && setError('quantity', {
        type: "warehouse",
        message: data?.quantity
    })
}

const WarehouseValidation = () => {
    return Yup.object().shape({
        quantity: Yup.number()
            .required('Vui lòng nhập vào Số lượng kích sản phẩm')
            .min(0, 'Bạn phải nhập số lượng kích sản phẩm trên 0 sản phẩm')
            .max(1000, 'Bạn phải nhập số lượng kích sản phẩm dưới 1000 sản phẩm')
            .typeError('Số lượng kích sản phẩm là một con số'),
    });
}

export default WarehouseValidation;
