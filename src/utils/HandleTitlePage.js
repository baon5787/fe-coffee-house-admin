import { PATH } from "~/constants/Paths"
import { disenable } from "~/helper/AppString";

const getLocationSpl = (location) => {
    return location?.split('/')
}

export const getTitlePageUser = (location, param) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.USER && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách tài khoản nhân viên'
            }
        }

        if (index === 2 && item === PATH.DISENABLE) {
            currentTitle = {
                ...currentTitle,
                title: `${currentTitle?.title} vô hiệu hóa`,
            }
        }

        return currentTitle;

    }, {});
}

const getTitlteProductChildren = (param, currentTitle, item, index, maxIndex) => {
    if (index > maxIndex && index < maxIndex) return currentTitle;

    if (param) return {
        ...currentTitle,
        to: PATH.PRODUCTS,
        subTitle: 'Cập nhật sản phẩm',
    }

    if (item === PATH.ADD) {
        currentTitle = {
            ...currentTitle,
            to: PATH.PRODUCTS,
            subTitle: 'Thêm sản phẩm',
        }
    }

    if (item === PATH.DISENABLE) {
        currentTitle = {
            ...currentTitle,
            title: `${currentTitle?.title} vô hiệu hóa`,
        }
    }
    return currentTitle;
}

export const getTitlePageProduct = (location, param) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.PRODUCTS && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách sản phẩm'
            }
        }
        return getTitlteProductChildren(param, currentTitle, item, index, 2);
    }, {});
}

const getTitleOptionCategory = (currentTitle, item, index) => {
    if (index > 2 && index < 2) return currentTitle;

    let result = currentTitle?.title;

    if (item === PATH.PARENT) result += ' cha';

    if (item === PATH.SUB) result += ' con';

    if (item === PATH.DISENABLE) result += disenable;

    return {
        ...currentTitle,
        title: result,
    }
}

export const getTitlePageCategory = (location) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.CATEGORIES && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách loại sản phẩm '
            }
        }

        return getTitleOptionCategory(currentTitle, item, index);
    }, {});
}

export const getTitlePageWareHouse = (location) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.WAREHOUSES && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách kho'
            }
        }
        return currentTitle;
    }, {});
}

export const getTitlePageSize = (location, param) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.SIZES && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách kích thước sản phẩm'
            }
        }

        if (index === 2 && item === PATH.DISENABLE) {
            currentTitle = {
                ...currentTitle,
                title: `${currentTitle?.title} vô hiệu hóa`,
            }
        }

        return currentTitle;

    }, {});
}

export const getTitlePageCoupon = (location) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.COUPONS && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách mã giảm giá'
            }
        }
        return currentTitle;

    }, {});
}

export const getTitlePageOrder = (location, param) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.ORDERS && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách Order'
            }
        }

        if (param) {
            currentTitle = {
                ...currentTitle,
                to: PATH.ORDERS,
                subTitle: 'Order Details',
            }
        }

        return currentTitle;

    }, {});
}

export const getTitlePageDelivery = (location, param) => {
    return getLocationSpl(location)?.reduce((currentTitle, item, index) => {

        if (index === 0) return currentTitle;

        if (item === PATH.DELIVERY && index === 1) {
            currentTitle = {
                ...currentTitle,
                title: 'Danh sách'
            }
        }

        if (item === PATH.ORDERS && index === 2) {
            currentTitle = {
                ...currentTitle,
                title: `${currentTitle.title} đơn đặt hàng`
            }
        }

        if (item === PATH.UNCONFIMRED && index === 3) {
            currentTitle = {
                ...currentTitle,
                title: `${currentTitle.title} chưa xác nhận`
            }
        }

        if (item === PATH.ACCOMPLISHED && index === 3) {
            currentTitle = {
                ...currentTitle,
                title: `${currentTitle.title} hoàn thành`
            }
        }

        if (item === PATH.UNACCOMPLISHED && index === 3) {
            currentTitle = {
                ...currentTitle,
                title: `${currentTitle.title} chưa hoàn thành`
            }
        }


        return currentTitle;

    }, {});
}