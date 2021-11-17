import React from 'react';
import s from './formsControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({meta: {touched, error}, children}) => {//внутреняя деструктуризация 
    const hasError = touched && error;
    return (
        <div className={s.formControl}>
            <div className = {(hasError ? s.error : "")}>
                {children}
            </div>
            {hasError && <span className={s.errorText}>{error}</span>}
        </div>
    )
}   

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder, name, component, validators, props = {}, text="") => <div><Field 
                                                                        placeholder={placeholder} 
                                                                        name={name} 
                                                                        component={component} 
                                                                        validate={validators}
                                                                        {...props}/>{text}</div>