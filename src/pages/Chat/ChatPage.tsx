import Button from 'antd/lib/button'
import TextArea from 'rc-textarea'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../api/chat-api'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat/chat-reducer'
import { selectChatStatus, selectMessages } from '../../redux/chat/chat-selectors'
import { AppStateType } from '../../redux/redux-store'


export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const status = useSelector(selectChatStatus)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div>
            {status === 'error' && <div>SOME ERROR OCCURED. REFRESH PAGE</div>}

            <Messages />
            <AddMassageForm />
        </div>
    )
}

const Messages: React.FC<{}> = () => {

    const messages = useSelector(selectMessages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages, isAutoScroll])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 10 ) {
            setIsAutoScroll(true)
        }
        else {
            setIsAutoScroll(false)
        }
    }

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m: any, index: number) => <Message key={m.id} message={m} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {

    return (
        <div>
            <img src={message.photo} width="30px" alt={''}/><b>{message.userName}</b>
            <br />
            <p>{message.message}</p>
            <hr />
        </div>
    )
})

const AddMassageForm: React.FC<{}> = () => {

    const [message, setMessage] = useState('')

    const status = useSelector(selectChatStatus)
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} rows={4} autoSize />
            </div>

            <div>
                <Button disabled={status === 'pending'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div >
    )
}

