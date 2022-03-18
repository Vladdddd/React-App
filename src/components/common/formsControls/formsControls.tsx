import React from 'react'
import s from './formsControls.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../utils/validators'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {//внутреняя деструктуризация 
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | null, 
    name: FormKeysType, 
    component: React.FC<WrappedFieldProps>, 
    validators: Array<FieldValidatorType>, 
    props = {}, 
    text="") {return <div className={s.field}>
        <Field 
            placeholder={placeholder} 
            name={name} 
            component={component} 
            validate={validators}
            {...props}/>{text}</div>
}

export type GetStringKeys<T> = Extract<keyof T, string>