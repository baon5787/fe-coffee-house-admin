import React, { useLayoutEffect, useState } from 'react'
import CheckBox from '~/components/form/CheckBox/CheckBox';
import { MIN_LENGTH } from '~/constants/AppConstant';
import { isEmptyArray } from '~/utils/CheckValue';

const ListCheckBoxSize = ({ options = [], register, setValue, getValues, name, valeSizes }) => {
    const [data, setData] = useState([]);

    useLayoutEffect(() => {
        const handleData = () => {

            if (isEmptyArray(options)) return;

            // defaut size
            let newData = options?.map((item) => {
                return { ...item, isChecked: false, isBlock: false }
            });

            if (!isEmptyArray(getValues)) {
                getValues?.forEach((s) => {
                    let tempSize = newData.map((item) => item?.id.toString() === s
                        ? { ...item, isChecked: true } : item);
                    return newData = [...tempSize];
                });
            }

            //update product
            if (!isEmptyArray(valeSizes)) {
                valeSizes?.forEach((s) => {
                    let tempSize = newData.map((item) => item?.id.toString() === s
                        ? { ...item, isChecked: true, isBlock: true } : item);
                    return newData = [...tempSize];
                });
            }

            setData(newData)
        }
        handleData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues, options])

    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (value === "ALL") {

            let values = [];

            let tempData = data.map((item) => {

                if (checked && !item?.isBlock) {
                    checked && values.push(item?.id.toString())
                }

                return !item?.isBlock ? { ...item, isChecked: checked } : item;
            });
            setData(tempData)
            setValue(name, values)
        } else {
            let tempData = data.map((item) =>
                item?.id?.toString() === value && !item.isBlock ? { ...item, isChecked: checked } : item
            );
            setData(tempData);
        }
    }

    if (isEmptyArray(data)) return;

    return (
        <>
            {
                data?.map((item, index) => {
                    return (
                        <CheckBox key={index}
                            register={register}
                            onChange={(e) => handleChange(e)}
                            isChecked={item?.isChecked}
                            title={item?.title}
                            value={item?.id} />
                    )
                })
            }
            <CheckBox title={"ALL"}
                value={"ALL"}
                onChange={(e) => handleChange(e)}
                isChecked={data?.filter((item) => item?.isChecked !== true).length <= MIN_LENGTH}
            />
        </>
    )
}

export default ListCheckBoxSize
