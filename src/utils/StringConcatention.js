import { DEFAULT_INDEX } from "~/constants/AppConstant";
import { warningStr } from "~/helper/AppString";
import { isValueObject } from "./CheckValue";

export const warningSeletedTitle = (option, data) => {
    return warningStr + option + data + ' đã chọn không ?';
}

export const warningTitle = (option, data) => {

    return warningStr + option + data + ' không ?';
}

export const successSeletedTitle = (data) => {
    return data + ' đã chọn.';
}

//category
export const getTitleParentCategory = (category) => {

    if (!isValueObject(category)) {
        console.error('Error path Variable');
        return;
    };

    let title = ` danh mục cha ${category?.name}`;
    if (category?.children === null) return title;
    return title + category?.children?.reduce(
        (currentStr, item, index) => currentStr += (index !== DEFAULT_INDEX
            ? `, ${item}` : ` và các danh mục con ${item}`)
        , '');
}

export const getTitleEnableCategory = (category) => {
    console.log(category?.parent === null ? 'cha' : 'con');
    let title = ` danh mục ${category.parent === null ? 'cha' : 'con'}`;
    return `${title} ${category.name}`;
}


export const getTitleStateTranstion = (data) => {
    return `Chuyển đổi thành công  ${data}`
}

//Warehouse
export const getTitleDeleteWarehouse = (warehouse) => {
    if (!isValueObject(warehouse)) {
        console.error('Error path Variable');
        return;
    };

    return `kích thước ${warehouse?.sizeName} của sản phẩm ${warehouse?.productName}`
}

//Product Size
export const getTitleDeleteProductSize = (productSize) => {
    if (!isValueObject(productSize)) {
        console.error('Error path Variable');
        return;
    };

    return `kích thước ${productSize?.sizeName} của sản phẩm ${productSize?.productName}`
}



