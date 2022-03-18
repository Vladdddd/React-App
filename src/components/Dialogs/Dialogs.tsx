import React from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../utils/validators';
import { createField, Input, Textarea } from '../common/formsControls/formsControls';
import { InitialStateType } from '../../redux/dialogs-reducer';

const maxLength60 = maxLengthCreator(60);

type DialogFormValuesType = {
    newMessageText: string
}


export type DialogFormValuesTypeKeys = Extract<keyof DialogFormValuesType, string>    
type DialogFormType = {}

const DialogsForm: React.FC<InjectedFormProps<DialogFormValuesType, DialogFormType> & DialogFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<DialogFormValuesTypeKeys>("Enter your message", "newMessageText", Input, [required, maxLength60], Textarea)}
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    );


}

const DialogsReduxForm = reduxForm<DialogFormValuesType>({ form: 'dialogAddMessageForm' })(DialogsForm);

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (message: string) => void
}


const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id} />);
    let messageElements = state.messages.map(m => <Message mess={m.mess} key={m.id} time={m.time}/>);


    const onSubmit = (formData: { newMessageText: string }) => {
        props.sendMessage(formData.newMessageText);
    }

    return (
        <div className={s.dialogsPage}>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>

                <div className={s.messages}>
                    {messageElements}
                    <DialogsReduxForm onSubmit={onSubmit} />
                </div>
            </div>

            <div className={s.selectedDialog}>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    );
}

export default Dialogs;