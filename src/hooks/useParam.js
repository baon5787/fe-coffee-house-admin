import { useState } from "react";

const useParam = () => {
    const [param, setParam] = useState(null);

    const resetParam = () => setParam(null);

    return {
        param,
        setParam,
        resetParam
    }
}

export default useParam