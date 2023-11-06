import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

//Theme
export const THEME_NAME = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
}

export const THEME = [
    {
        name: THEME_NAME.LIGHT,
        icon: faSun
    },
    {
        name: THEME_NAME.DARK,
        icon: faMoon
    },
    {
        name: THEME_NAME.SYSTEM,
        icon: faDesktop
    }
]


export const USERS = [
    { name: 'My Profile', to: '/profile' },
    { name: 'Sign Out', to: '/logout' }
]

export const MAX_INNERWIDTH = 991;

// HTTP STATUS
export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
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

// FILTER
export const DEFAULT_FILTERS = {
    limit: 1,
    page: 1,
}

export const MIN_PAGE = 0;

export const MIN_PAGINATION = 2;

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

export const DEFAULT_STATUS = {
    value: "ALL",
    label: "Tất Cả"
};

// IMAGE 
export const MAX_SIZE = 5242880;

export const ERROR_IMAGE = 'thêm hình ảnh không thành cống'

// BASE CONSTANT

export const EMPTY_ARRAY = [];

export const DEFAULT_INDEX = 0;

export const MIN_LENGTH = 0;

export const OBJECT_MIN_LENGTH = 1;

export const STATUS_PUBLISHED = 'PUBLISHED';

export const ALL = 'ALL';

export const MATCH = 'Match!';

export const OFFSET = 300;

export const OPTION_PAGE = {
    SUB: 'sub',
    PARENT: 'parent',
    DISENABLE: 'disenable',
    ENABLED: 'enabled',
    UNCONFIMRED: 'unconfimred',
    UNACCOMPLISHED: 'unaccomplished',
    ACCOMPLISHED: 'accomplished'
};

export const STATUS_CANCELLED = {
    stateName: 'Hủy hóa đơn',
    status: 'CANCELLED'
}

export const DOTS = '...';