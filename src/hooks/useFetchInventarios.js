import { useEffect, useRef, useState } from "react"

export const useFetchInventarios = url => {
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null});

    // Cuando el componente se desmonte
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setState({ data: null, loading: true, error: false});

        fetch(url, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                authorization: localStorage.getItem('token')
            }
        })
            .then(data => data.json())
            .then( resp => {
                if(isMounted.current){
                    setState({
                        data: resp,
                        loading: false,
                        error: null
                    })
                } else {
                    console.log('setState no se llamó')
                }
            });

    }, [url])

    return state;

}

