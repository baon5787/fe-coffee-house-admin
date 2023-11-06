// import {
//     DEFAULT_INDEX, LAST_HOURS_DAY, LAST_MINUTES_DAY,
//     LAST_SECONDS_DAY, MIN_DATE, MIN_YEAR,
//     THE_COFFEE_HOUSE
// } from "~/constants/AppConstant";
// import { conversionNumberToVND } from "./HandleTable";
// import { errorApi } from "~/helper/AppString";
// import { ERROR } from "~/constants/Paths";
// import { success, swalMixin } from "~/components/swal/Swal";
// import Swal from "sweetalert2";
// import { isEmptyArray, isValueArray } from "./CheckValue";

import { isParam } from "./CheckValue";

// Get Value Form 
export const getValueString = (value) => value ? value : '';

export const getTitleForm = (param) => isParam(param) ? 'Cập nhật' : 'Thêm';

// export const getValueNumber = (value) => value ? value : 0;

// // GET VALUE MAP
// export const getSourcePointStartAndEnd = (coordinatesStart, customerName) => {
//     return {
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [coordinatesStart?.longitude, coordinatesStart?.latitude]
//                 },
//                 properties: {
//                     icon: 'end',
//                     name: `${customerName}`,
//                     lnglnt: `${coordinatesStart?.longitude},${coordinatesStart?.latitude}`,
//                 }
//             },
//             {
//                 'type': 'Feature',
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [THE_COFFEE_HOUSE.longitude, THE_COFFEE_HOUSE.latitude]
//                 },
//                 properties: {
//                     icon: 'start',
//                     name: `${THE_COFFEE_HOUSE.title}`,
//                     lnglnt: `${THE_COFFEE_HOUSE.longitude},${THE_COFFEE_HOUSE.latitude}`
//                 }
//             }
//         ]
//     }
// }

// export const getSourceLine = (coordinates) => {
//     return {
//         'type': 'FeatureCollection',
//         'features': [{
//             'type': 'Feature',
//             'geometry': {
//                 'type': 'LineString',
//                 'coordinates': coordinates
//             }
//         }]
//     }
// }

// export const getSourcePoint = (longitude, latitude) => {
//     return {
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [longitude, latitude]
//                 },
//             },
//         ]
//     }
// }

// export const coverDistanceAboutKm = (distance) => {
//     if (!distance) return;
//     return Math.round((distance / 1000) * 100) / 1000
// }

// export const coverDurationAboutTime = (duration) => {
//     if (!duration) return;
//     const minute = Math.round((duration / 60) * 10) / 100;
//     if (minute <= 60) {
//         return `${minute} phút`
//     } else {
//         const hour = Math.round((minute / 60) * 10) / 100;
//         return `${hour} giờ`
//     }
// }

// // HANDLE ORDER
// export const getSubtotalOrder = (data) => {
//     const DEFAULT_PRICE = 0;

//     if (!data) return;

//     const subtotal = data?.reduce((currentPrice, item) =>
//         currentPrice += ((item?.price + item?.sizePice) * item?.quantity)
//         , DEFAULT_PRICE)

//     return conversionNumberToVND(subtotal);
// }


// export const getStateOrderName = (data, status) => {
//     if (isEmptyArray(data)) return;

//     const statusOrder = data?.reduce((arrCurrent, item, index, arr) => {
//         // after status current and length data bigger index
//         if (item?.status === status && index < (arr.length - 1)) {
//             return [...arrCurrent, arr[index + 1]];
//         }
//         return arrCurrent;
//     }, []);

//     if (isEmptyArray(statusOrder)) return;
//     return statusOrder[DEFAULT_INDEX]?.stateName;
// }


// export const getOrderStatusesByTwoStatus = (statuses, statusOne, statusTwo) => {
//     if (isEmptyArray(statuses) || !statusOne || !statusTwo) return;

//     return statuses.filter((status) => status?.value === statusOne || status?.value === statusTwo);
// }

// // HANDLE DATE
// export const getCurrentPlusOneDay = () => {
//     const oneDay = 1
//     const date = new Date();

//     const currentDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

//     let currentDate = new Date(currentDay)

//     currentDate.setDate(currentDate.getDate() + oneDay);
//     currentDate.setHours(LAST_HOURS_DAY)
//     currentDate.setMinutes(LAST_MINUTES_DAY)
//     currentDate.setSeconds(LAST_SECONDS_DAY)
//     return currentDate;
// }


// export const getDate = new Date();

// export const getYears = () => {

//     let year = [];

//     for (let index = getDate?.getFullYear() + 1; index > MIN_YEAR; index--) {
//         year = [
//             ...year,
//             {
//                 value: index,
//                 label: `Năm ${index}`
//             }
//         ]
//     }
//     return year;
// }

// export const getMonths = (month) => {

//     let months = [];

//     for (let index = 1; index <= month + 1; index++) {
//         months = [
//             ...months,
//             {
//                 value: index,
//                 label: `Tháng ${index}`
//             }
//         ]
//     }
//     return months;
// }

// export const getDays = (day) => {

//     let days = [];

//     if (day === MIN_DATE.DAY) return days;

//     for (let index = 1; index <= day + 1; index++) {
//         days = [
//             ...days,
//             {
//                 value: index,
//                 label: `Ngày ${index}`
//             }
//         ]
//     }
//     return days;
// }

// export const getDay = (month, year) => {
//     const date = new Date();

//     let day = MIN_DATE.DAY;

//     if (!month || !year) return day;

//     // getMonth : 0-11 -> month + 1;
//     if (month === (date.getMonth() + 1) && year === date.getFullYear()) {
//         return date.getDate();
//     }

//     switch (month) {
//         case 1: case 3: case 5: case 7: case 8: case 10: case 12: {
//             day = 31;
//             break;
//         }
//         case 4: case 6: case 9: case 11: {
//             day = 30;
//             break;
//         }
//         case 2: {
//             day = isLeapYear(year) ? 29 : 28;
//             break;
//         }
//         default:
//             break;
//     }

//     return day;
// }

// export const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;


// // SELECT
// export const getValueSelect = (data) => {
//     if (isEmptyArray(data)) return [];
//     return data?.map((item) => item?.value);
// }

// export const getOptionSelect = (data, value) => {
//     if (isEmptyArray(data)) return [];
//     return data?.filter((item) => item?.value === value);
// }

// export const getNameBySelect = (data, value) => {
//     if (isEmptyArray(data)) return;

//     const option = data?.filter((item) => item?.value === value);
//     if (isEmptyArray(option)) return;

//     return option[DEFAULT_INDEX]?.label;
// }

// export const getFullAddress = (provinces, districts, wards, valueProvince, valueDistrict,
//     valueWard, address) => {
//     if (isEmptyArray(provinces) || isEmptyArray(districts) || isEmptyArray(wards)) return;

//     const province = provinces?.filter((provice) => provice?.value === valueProvince);
//     const district = districts?.filter((district) => district?.value === valueDistrict);
//     const ward = wards?.filter((ward) => ward?.value === valueWard);
//     if (isEmptyArray(province) || isEmptyArray(district) || isEmptyArray(ward)) return;

//     return `${address}, ${ward[DEFAULT_INDEX]?.label}, ${district[DEFAULT_INDEX]?.label}, ${province[DEFAULT_INDEX]?.label}`;
// }

// //HANDLE ARRAY
// export const addIsCheckedToList = (arr) => {
//     if (!Array.isArray(arr)) return;

//     return arr?.map((item) => {
//         return { ...item, isChecked: false }
//     });
// }

// export const getRolesName = (roles) => {
//     if (!isValueArray(roles) || isEmptyArray(roles)) return;

//     return roles?.map((role) => role?.name)?.join(', ');
// }


// export const setArraySelect = (name) => {
//     return [{
//         label: name,
//         value: name,
//     }]
// }

// export const getValueMaxIndexByArray = (data) => {
//     if (isEmptyArray(data)) return;
//     // index 0 -> maxIndex should leangth - 1
//     return data[data?.length - 1];
// }

// // SORT
// export const getSortDir = (sortDir, sortField, name) => {
//     return sortField === name ? sortDir : undefined;
// }

// export const loadUpdateUser = (data, tile, hideSumbit) => {

//     if (typeof hideSumbit !== 'function') {
//         throw new Error('Error props not function');
//     }

//     if (!tile) {
//         throw new Error(errorApi);
//     }

//     if (tile === ERROR) return;

//     swalMixin().fire({
//         icon: 'success',
//         title: tile
//     });
//     hideSumbit(data);
// }

// export const notificationSwalSuccess = (title) => {
//     Swal.fire(success(title)).then((result) => {
//         if (result.isConfirmed) {
//             console.log(title)
//         }
//     });
// }

export const getTitleErrorParam = (data) => {

    const firstPostion = 0;
    const lastFourCharacters = 4;

    let title = "";

    if (data?.limit) {
        title += `${data?.limit} và `;
    }

    if (data?.page) {
        title += `${data?.page} và `;
    }

    if (data?.sortField) {
        title += `${data?.sortField} và `;
    }

    if (data?.sortDir) {
        title += `${data?.sortDir} và `;
    }

    if (data?.status) {
        title += `${data?.status} và `;
    }

    if (!title.trim()) return title;

    return title.slice(firstPostion, title?.length - lastFourCharacters);
}


