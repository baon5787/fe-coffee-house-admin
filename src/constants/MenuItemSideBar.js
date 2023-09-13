import { PATH } from "./Paths"

export const PRODUCT = {
    title: 'Product',
    to: PATH.PRODUCTS,
    children: [
        {
            title: 'Danh sách sản phẩm',
            to: PATH.INDEX,
        },
        {
            title: "Danh sách sản phẩm bị vô hóa",
            to: PATH.DISENABLE,
        }
    ]
}

export const CATEGORY = {
    title: 'Category',
    to: PATH.CATEGORIES,
    children: [
        {
            title: "Danh sách loại sản phẩm chính",
            to: PATH.PARENT,
        },
        {
            title: "Danh sách loại sản phẩm con",
            to: PATH.SUB,
        },
        {
            title: "Danh sách loại sản phẩm bị vô hiệu hóa",
            to: PATH.DISENABLE,
        }
    ]
}

export const WAREHOUSE = {
    title: 'Warehouse',
    to: PATH.WAREHOUSES,
    children: [
        {
            title: "Danh sách loại kho",
            to: PATH.INDEX,
        }
    ]
}

export const SIZE = {
    title: 'Size',
    to: PATH.SIZES,
    children: [
        {
            title: "Danh sách kích thước sản phẩm",
            to: PATH.INDEX,
        },
        {
            title: "Danh sách kích thước sản phẩm bị vô hóa",
            to: PATH.DISENABLE,
        }
    ]
}

export const COUPON = {
    title: 'Coupon',
    to: PATH.COUPONS,
    children: [
        {
            title: "Danh sách phiếu giảm giá",
            to: PATH.INDEX,
        },
        {
            title: "Danh sách phiếu giảm giá bị vô hóa",
            to: PATH.DISENABLE,
        }
    ]
}

export const ORDER = {
    title: 'Order',
    to: PATH.ORDERS,
    children: [
        {
            title: "Danh sách hóa đơn của khách hàng",
            to: PATH.INDEX,
        },
    ]
}

export const DELIVERY = {
    title: 'Delivery',
    to: PATH.DELIVERY + '/' + PATH.ORDERS,
    children: [
        {
            title: "Danh sách đơn đặt hàng chưa được xác nhận",
            to: PATH.UNCONFIMRED,
        },
        {
            title: "Danh sách đơn đặt hàng chưa hoàn thành của nhân viên",
            to: PATH.UNACCOMPLISHED,
        },
        {
            title: "Danh sách đơn đặt hàng hoàn thành của nhân viên",
            to: PATH.ACCOMPLISHED,
        },
    ]
}

export const USER = {
    title: 'User',
    to: PATH.USER,
    children: [
        {
            title: "Danh sách tài khoản nhân viên",
            to: PATH.INDEX,
        },
        {
            title: "Danh sách tài khoản nhân viên bị vô hóa",
            to: PATH.DISENABLE,
        },
    ]
}