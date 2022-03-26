import Paragraph from 'antd/lib/typography/Paragraph';
import React, {useState, useEffect, ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'

type PropsType = {
    status: string
    isOwner: boolean

    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    const setStatus = (editableStr: string) => {
        props.updateStatus(editableStr);
    }

    return (
        <>
            <Paragraph 
                editable={{ 
                    onChange: setStatus, 
                    maxLength: 45,
                }}
                className={s.status}
            >{props.status || "-----"}</Paragraph>
        </>
    );


}

export default ProfileStatusWithHooks;