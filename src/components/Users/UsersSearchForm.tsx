import React from 'react'
import { Field, Form, Formik } from 'formik'
import { FilterType } from '../../redux/users-reducer'
import { useSelector } from 'react-redux'
import { getUsersFilter } from '../../redux/users-selectors'
import s from './Users.module.css'

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

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, actions: ActionsType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false 
        }

        onFilterChanged(filter)
        actions.setSubmitting(false)
    }

    return (
        <div className={s.searchForm}>
            <h1>Search</h1>
            <Formik
                enableReinitialize={true}
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
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