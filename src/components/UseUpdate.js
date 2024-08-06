import { useEffect, useRef } from 'react';

/**
 * Fire on dependency update
 * @returns {any}
 */
export default function useUpdate(callback, dependencies) {

    const firstRender = useRef(true);

    /**
     * On component update
     */
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        return callback();
    }, dependencies);

};