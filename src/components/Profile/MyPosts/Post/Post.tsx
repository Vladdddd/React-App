import React from 'react';
import s from './Post.module.css';

type PropsType = {
    message: string
    name: string
    age: number
}

const Post: React.FC<PropsType> = (props) => {
  return (

    <div className={s.item}>
      <img src="https://avatarfiles.alphacoders.com/161/thumb-161485.png" alt=""/>
      <span>{props.message} </span>

      <div>
        <span> {props.name}, {props.age} y.o.</span>
      </div>
    </div>

  );

}

export default Post;