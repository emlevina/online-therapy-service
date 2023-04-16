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
import { useFetch } from '../../hooks/useFetch';
import { getMethods, getThemes, getTherapistDetailsFiltered } from '../../actions';
import Therapists from './components/Therapists';

const Filter = () => {
    const { data: methods, loading: methodsLoading } = useFetch(getMethods)
    const { data: themes, loading: themesLoading } = useFetch(getThemes)
    const { data: therapists, loading: therapistsLoading, refetch: refetchTherapists } = useFetch(getTherapistDetailsFiltered, [{ methods: [], themes: [] }])
    const { handleSubmit, control } = useForm();

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

        refetchTherapists([reduced])
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h2>Methods</h2>
            {(!methods && methodsLoading) && <p>Methods are loading...</p>}
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
                                size="small"
                                value={method._id} {...field} />}
                        />
                    }
                />
            ))}

            <h2>Themes</h2>
            {(!themes && themesLoading) && <p>Themes are loading...</p>}
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
                        size="small" 
                            value={theme._id} {...field} />}
                    />
                }
            />)}
            <br />
            <Button variant='contained' type='submit'>Search</Button>
            {therapistsLoading && 'loading...'}
            {!therapistsLoading && <Therapists therapists={therapists} />}
        </form>
    );
};

export default Filter;