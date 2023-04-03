import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormLabel
} from '@mui/material';
import axios from 'axios';

const Filter = () => {
    const [methods, setMethods] = useState([])
    const [themes, setThemes] = useState([])
    const [msg, setMsg] = useState('')
    const { handleSubmit, control } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios.get('/methods')
            setMethods(response1.data)
            const response2 = await axios.get('/themes')
            setThemes(response2.data)
        }

        fetchData()
    }, [])

    const onSubmit = async (data) => {
        //console.log(data)
        const reduced = Object.entries(data).reduce((acc, item) => {
            if (item[1]) {
                const [type, _id] = item[0].split('_')

                acc = { ...acc, [type]: [...acc[type], _id] }

            }
            return acc
        }, { methods: [], themes: [] })
        // const array 
        console.log(reduced)
        const response = await axios.post('/therapistdetails/filter', reduced)
        console.log(response.data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h2>Methods</h2>
            {methods && methods.map(method => (
                <FormControlLabel
                    label={method.title}
                    key={method._id}

                    control={
                        <Controller
                            name={`methods_${method._id}`}
                            control={control}
                            checked={false}
                            defaultValue={false}
                            render={({ field }) => <Checkbox
                                value={method._id} {...field} />}
                        />
                    }
                />
            ))}

            <h2>Themes</h2>
            {themes && themes.map(theme => <FormControlLabel
                label={theme.title}
                key={theme._id}

                control={
                    <Controller
                        name={`themes_${theme._id}`}
                        control={control}
                        checked={false}
                        defaultValue={false}
                        render={({ field }) => <Checkbox
                            value={theme._id} {...field} />}
                    />
                }
            />)}

            <Button variant='contained' type='submit'>Search</Button>
        </form>
    );
};

export default Filter;