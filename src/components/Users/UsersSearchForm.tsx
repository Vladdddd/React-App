import React from 'react'
import { Field, Form, Formik } from 'formik'
import { FilterType } from '../../redux/users-reducer'

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    /*
    if (!values.term) {
        errors.term = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.term)
    ) {
        errors.term = 'Invalid email address';
    }
    */
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type ActionsType = {
    setSubmitting: (isSubmitting: boolean) => void
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {

    const submit = (values: FormType, actions: ActionsType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false 
        }

        onFilterChanged(filter)
        actions.setSubmitting(false)
    }

    return (
        <div>
            <h1>Search</h1>
            <Formik
                initialValues={{ term: '', friend: 'null' }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default UsersSearchForm