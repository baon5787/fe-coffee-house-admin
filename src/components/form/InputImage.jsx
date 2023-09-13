import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import { getValueString } from '~/utils/HandleValue';

const InputImage = ({ className, setValue, setError, errors, name, value }) => {
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
        <>
            <div className={`image-input ${className} ${baseImage !== "" ? 'image-input-changed' : 'image-input-empty'}`} >
                <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{ backgroundImage: `${!baseImage.trim() ? '' : `url(${baseImage})`}` }}
                />

                <label
                    className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action="change"
                    title="Change avatar"
                >
                    <span className='svg-icon svg-icon-8'>
                        <FontAwesomeIcon icon={faPencil} />
                    </span>
                    <input type='file' name={name} accept='.png, .jpg, .jpeg' onChange={(event) => uploadImage(event)} />
                    <input type='hidden' name="avatar_remove" />
                </label>
                <span
                    className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='cancel'
                    title='Cancel avatar'
                    onClick={() => removeImage()}
                >
                    <span className='svg-icon svg-icon-5'>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </span>
                <span
                    className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    title='Remove avatar'
                >
                    <span className='svg-icon svg-icon-5'>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                </span>
            </div>
        </>
    )
}

InputImage.propTypes = {
    baseImage: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default InputImage;
