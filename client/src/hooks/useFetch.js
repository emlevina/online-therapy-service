import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';

export const useFetch = (callback) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const _callback = useCallback(callback, [])

    const fetch = useCallback(async () => {
        setLoading(true)
        try {
            const response = await _callback()
            setData(response.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }, [_callback])


    useEffect(() => {
        fetch()
    }, [fetch])

    return {
        error,
        loading,
        data,
        refetch: fetch
    }
}