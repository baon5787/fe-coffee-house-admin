import React, { useLayoutEffect, useState } from 'react'
import CheckBox from './CheckBox';
import { MIN_LENGTH } from '~/constants/AppConstant';
import PropTypes from 'prop-types';

export const ListCheckBox = ({ options = [], register, setValue, getValues, name }) => {

    const [data, setData] = useState([]);

    useLayoutEffect(() => {
        const handleData = () => {

            if (options?.length === MIN_LENGTH) return;

            // defaut size
            let newData = options?.map((item) => {
                return { ...item, isChecked: false }
            });

            //update product
            getValues?.forEach((s) => {
                let tempSize = newData.map((item) => item?.id.toString() === s
                    ? { ...item, isChecked: true } : item);
                return newData = [...tempSize];
            });

            setData(newData)
        }
        handleData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (value === "ALL") {

            let values = [];

            let tempData = data.map((item) => {

                if (checked) values.push(item?.id.toString())

                return { ...item, isChecked: checked };
            });
            setData(tempData)
            setValue(name, values)
        } else {
            let tempData = data.map((item) =>
                item?.id?.toString() === value ? { ...item, isChecked: checked } : item
            );
            setData(tempData);
        }
    }

    if (data === undefined || data?.length === 0) {
        return;
    }
    return (
        <div className='row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9'>
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
        </div>
    )
}

ListCheckBox.propTypes = {
    options: PropTypes.array,
    setValue: PropTypes.func,
    getValues: PropTypes.array,
    name: PropTypes.string,
}

export default ListCheckBox;
