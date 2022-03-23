import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringKeys, Input } from '../common/formsControls/formsControls';
import { maxLengthCreator, required } from '../utils/validators';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import s from './login.module.css';
import { AppStateType } from '../../redux/redux-store';


const maxLength25 = maxLengthCreator(25);

type LoginFormProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormProps>  & LoginFormProps> = ({ handleSubmit, error, captchaUrl }) => { // деструктуризация параметров 
    return (
        <form onSubmit={handleSubmit}>

            <div className={s.email}>
                {createField<LoginFormValuesTypeKeys>("Email", "email", Input, [required, maxLength25], { type: "login" })}
            </div>
            <div className={s.pass}>
                {createField<LoginFormValuesTypeKeys>("Password", "password", Input, [required, maxLength25], { type: "password" })}
            </div>
            <div className={s.rememberMe}>
                {createField<LoginFormValuesTypeKeys>(null, "rememberMe", Input, [], { type: "checkbox" }, "rememberMe")}
            </div>



            {captchaUrl && <img src={captchaUrl} alt="" />}
            {captchaUrl && createField("Symbols from img", "captcha", Input, [required], {})}

            {error &&
                <div className={s.error}>{error}</div>
            }
            <div><button className={s.loginButton}>Login to your account</button></div>
        </form>

    );

}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormProps>({ form: 'login' })(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>    




const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div className={s.reduxForm}>
            <div className={s.form}>
                <h1>Account Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
                <p className={s.loginInfo}>
                    You'll receive a confirmation email in your inbox with a link to 
                    activate your account, if you have any problem, contact us
                </p>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);