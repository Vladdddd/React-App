import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createField, Input } from '../common/formsControls/formsControls';
import { maxLengthCreator, required } from '../utils/valdators';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import s from './login.module.css';


const maxLength25 = maxLengthCreator(25);

const LoginForm = ({ handleSubmit, error }) => { // деструктуризация параметров 
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", Input, [required, maxLength25])}
            {createField("Password", "password", Input, [required, maxLength25], { type: "password" })}
            {createField(null, "rememberMe", Input, [], { type: "checkbox" }, "rememberMe")}
            
            {error &&
                <div className={s.error}>{error}</div>
            }
            <div><button>Login</button></div>
        </form>

    );

}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);