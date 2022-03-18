import React, {useState, useEffect, ChangeEvent} from 'react';

type PropsType = {
    status: string
    isOwner: boolean

    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    
    let [editMode, setEditMode] = useState(false); //деструктурирующее присваивание
    let [status, setStatus] = useState(props.status);
    const { isOwner } = props
    
    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if(isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <>
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode} >{props.status || "-----"}</span>
                </div>
            }
            { editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} type="text" value={status}/>
                </div>  
            }
        </>
    );


}

export default ProfileStatusWithHooks;