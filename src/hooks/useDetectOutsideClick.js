import {useEffect, useRef} from "react";

export function useDetectOutsideClick(callback, listenCapturing = true) {
    const detectOutsideClickElement = useRef();

    useEffect(function () {
        function handleClick(e) {
            if(detectOutsideClickElement.current && !detectOutsideClickElement.current.contains(e.target)) {
                callback();
            }
        }

        document.addEventListener("click", handleClick, listenCapturing);

        return () => document.removeEventListener("click", handleClick);
    }, [callback, listenCapturing]);

    return { detectOutsideClickElement };
}
