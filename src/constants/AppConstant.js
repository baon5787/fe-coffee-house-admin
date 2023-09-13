export const MAX_SIZE = 5242880;

export const STATUS_PUBLISHED = 'PUBLISHED';

export const EMPTY_ARRAY = [];

export const MIN_PAGE = 0;

export const MIN_PAGINATION = 2;

export const INCREASE_TOTALPAGE = 1

export const SORT_DIR = {
    ASC: 'ASC',
    DESC: 'DESC'
};

export const USER_SORT_FIELD = {
    EMAIL: 'email',
    JOINED_DATE: 'joinedDate',
}

export const CATEGORY_SORT_FIELD = {
    NAME: 'categoryNames'
}

export const SIZE_SORT_FIELD = {
    NAME: 'sizeName',
    PRICE: 'sizePrice',
}

export const PRODUCT_SORT_FIELD = {
    NAME: 'productName',
    PRICE: 'price',
}

export const PRODUCT_SIZE_SORT_FIELD = {
    QUANTITY: 'quantity',
}


export const OPTION_LIMIT = [
    {
        value: "1",
        label: "1"
    },
    {
        value: "2",
        label: "2"
    },
    {
        value: "3",
        label: "3"
    }
];

export const DEFAULT_PAGINATION = {
    LIMIT: 1,
    PAGE: 1,
}

export const DEFAULT_STATUS = {
    value: "ALL",
    label: "Tất Cả"
};

export const DEFAULT_FILTERS = {
    limit: 1,
    page: 1,
}

export const MATCH = 'Match!'
export const ALL = 'ALL'

export const DEFAULT_INDEX = 0;

export const MIN_LENGTH = 0;

export const OBJECT_MIN_LENGTH = 1;

export const OPTION_PAGE = {
    SUB: 'sub',
    PARENT: 'parent',
    DISENABLE: 'disenable',
    ENABLED: 'enabled',
    UNCONFIMRED: 'unconfimred',
    UNACCOMPLISHED: 'unaccomplished',
    ACCOMPLISHED: 'accomplished'
};


export const END_DAY = 'ENDDAY';

export const LAST_HOURS_DAY = 23;
export const LAST_MINUTES_DAY = 59;
export const LAST_SECONDS_DAY = 59.000;


export const THE_COFFEE_HOUSE = {
    longitude: 107.39910034084426,
    latitude: 10.534931060508768,
    title: `The Coffee House`
}

export const THEME = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
}

export const ORDER_STATUS = {
    PROCESSING: 'PROCESSING',
    SHIPPED: 'SHIPPED',
    CANCELLED: 'CANCELLED',
    DELIVERED: 'DELIVERED'
}

export const PAYMENT_STATUS = {
    SUCCESS: 'SUCCESS',
    CANCELLED: 'CANCELLED'
}

export const STATUS_CANCELLED = {
    stateName: 'Hủy hóa đơn',
    status: 'CANCELLED'
}


export const INDEX_CANCELLED = 1;

export const ORDER_EVENT = {
    NEXT: 'NEXT',
    CANCELLED: 'CANCELLED'
}

export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    PAYLOAD_TOO_LARGE: 413,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
}

export const MSG_ERROR = {
    BAD_REQUEST: 'Mẫu đơn đã được gửi bị lỗi!',
    FORBIDDEN: 'Bạn không quyền truy cập.',
    NOT_FOUND: 'Chúng tôi không thể tìm thấy trang đó.',
    NOT_API: 'Không có đường dẫn này.'
}


export const ERROR_IMAGE = 'thêm hình ảnh không thành cống'

export const MIN_YEAR = 1900;
export const MAX_MONTH = 12;
export const FEBRUARY = 2;
export const MIN_DATE = {
    DAY: 0,
    MONTH: 0,
    YEAR: 0,
}

export const MONTH = [
    {
        value: 1,
        label: 'Tháng 1'
    },
    {
        value: 2,
        label: 'Tháng 2'
    },
    {
        value: 3,
        label: 'Tháng 3'
    },
    {
        value: 4,
        label: 'Tháng 4'
    },
    {
        value: 5,
        label: 'Tháng 5'
    },
    {
        value: 6,
        label: 'Tháng 6'
    },
    {
        value: 7,
        label: 'Tháng 7'
    },
    {
        value: 8,
        label: 'Tháng 8'
    },
    {
        value: 9,
        label: 'Tháng 9'
    },
    {
        value: 10,
        label: 'Tháng 10'
    },
    {
        value: 11,
        label: 'Tháng 11'
    },
    {
        value: 12,
        label: 'Tháng 12'
    },
    {
        value: 13,
        label: 'Tháng 13'
    },
];