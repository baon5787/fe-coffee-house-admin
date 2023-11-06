import { isValueObject } from "./CheckValue";

export const isEqual = (object, newObject) => {

    if (!isValueObject(object) || !isValueObject(newObject)) return false;

    const objKeys = Object.keys(object);
    const objNewKeys = Object.keys(newObject);

    if (objKeys?.length !== objNewKeys?.length) {
        return false;
    }

    for (let key of objKeys) {
        if (object[key] !== newObject[key]) return false;
    }

    return true;
}