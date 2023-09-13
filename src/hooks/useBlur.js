
const useBlur = (setValue) => {

    const handleBlur = (e) => {
        let value = e.target.value;
        if (e.target.type === "number" && !value.trim()) value = "0";
        setValue(e.target.name.trim(), value, {
            shouldValidate: true,
            shouldTouch: true
        });
    }

    return {
        handleBlur,
    }
}

export default useBlur;
