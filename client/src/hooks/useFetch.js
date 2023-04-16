import { useEffect, useState, useCallback } from 'react';

export const useFetch = (callback, args = []) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    const memoizedCallback = useCallback(() => callback(...args), [])

    const fetch = useCallback(async () => {
        try {
            const response = await memoizedCallback()
            setData(response.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const refetch = async (args) => {
        setLoading(true)
        try {
            const response = await callback(...args)
            console.log(response)
            setData(response.data)
        } catch (err) {
            console.log(err)
            setError(err)
        }
        setLoading(false)
    }


    useEffect(() => {
        fetch()
    }, [fetch])

    return {
        error,
        loading,
        data,
        refetch,
        fetch
    }
}