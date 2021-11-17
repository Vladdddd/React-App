import React from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../utils/valdators';
import { Textarea } from '../common/formsControls/formsControls';

const maxLength60 = maxLengthCreator(60);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Enter your message' name={"newMessageText"} component={Textarea} validate={[required, maxLength60]} />
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    );


}

const DialogsReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(DialogsForm);

const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id} />);
    let messageElements = state.messages.map(m => <Message mess={m.mess} key={m.id} time={m.time}/>);


    const onSubmit = (formData) => {
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