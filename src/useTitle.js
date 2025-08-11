import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useTitle(title) {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
    }, [title, location]);
}

export default useTitle;
