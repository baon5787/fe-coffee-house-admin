import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getValueString } from '~/utils/HandleValue';

const InputImage = ({ setValue, setError, errors, name, value }) => {

    const [baseImage, setBaseImage] = useState(getValueString(value));

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setValue(name, file);
        setBaseImage(base64);
        if (errors) {
            setError(name, undefined);
        }
    }

    const removeImage = () => {
        setBaseImage("");
        setValue(name, undefined)
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className={`image-input image-input-placeholder mb-3 ${baseImage !== ""
            ? 'image-input-changed' : 'image-input-empty'}`
        }>
            <div className='image-input-wrapper w-[150px] h-[150px]'
                style={{ backgroundImage: `${!baseImage.trim() ? '' : `url(${baseImage})`}` }}
            >
                <label className='group btn btn-icon !border-img-input-none !bg-body-bg !w-[25px] !h-[25px] !shadow-shaw' data-kt-image-input-action="change">
                    <FontAwesomeIcon icon={faPencil} className='text-text-theme-muted w-[0.95rem] h-[0.95rem] group-hover:text-text-theme-primary' />
                    <input type='file' name={name} accept='.png, .jpg, .jpeg'
                        onChange={(event) => uploadImage(event)}
                    />
                    <input type='hidden' name="avatar_remove" />
                </label>
                <span className='group btn btn-icon !border-img-input-none !bg-body-bg !w-[25px] !h-[25px] !shadow-shaw' data-kt-image-input-action="remove"
                    onClick={() => removeImage()}
                >
                    <FontAwesomeIcon icon={faTrashCan} className='text-text-theme-muted w-[0.95rem] h-[0.95rem] group-hover:text-text-theme-primary' />
                </span>
            </div>
        </div>
    )
}

InputImage.propTypes = {
    baseImage: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}

export default InputImage