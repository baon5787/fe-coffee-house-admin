import * as Yup from 'yup';

export const InitialValues = (status) => {

    return {
        name: "",
        sku: "",
        price: "",
        description: "",
        status: status,
        size: []
    }
}

const ProductValidation = (update) => {
    return Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        sku: Yup.string()
            .test({
                name: 'is-sku',
                skipAbsent: true,
                test(value, ctx) {
                    if (!value.match(/^[A-Z]*$/)) {
                        return ctx.createError({ message: 'Kí hiệu không có kí tự đặt biệt và số, kí tự thường' });
                    }
                    return true;
                }
            })
            .required('Vui lòng nhập vào tên sản phẩm'),
        price: Yup.number()
            .required('Vui lòng nhập vào giá sản phẩm')
            .min(30000, 'Bạn phải nhập giá tiền sản phẩm trên 30000'),
        description: Yup.string()
            .required('Vui lòng nhập vào nội dung sản phẩm')
            .test({
                name: 'is-sku',
                skipAbsent: true,
                test(value, ctx) {
                    if (value.match(/[`!@#$^&*%"_+=[\]{};':\\|<>/?~]/)) {
                        return ctx.createError({ message: 'Tên sản phẩm không có một số kí tự đặt biệt' });
                    }
                    return true;
                }
            }),
    });
}



export default ProductValidation