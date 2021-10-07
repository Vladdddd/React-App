import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/formsControls/formsControls';
import { maxLengthCreator, required } from '../../utils/valdators';
import s from './myPosts.module.css';
import Post from './Post/Post';

const maxLength20 = maxLengthCreator(20);

const PostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"New post"} name={"newPostText"} component={Textarea} validate={[required, maxLength20]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const PostReduxForm = reduxForm({ form: 'myPostForm' })(PostForm);

let MyPosts = React.memo((props) => {
    console.log("Render");
    let postsElements = props.posts.map(p => <Post message={p.mess} name={p.name} age={p.age} />);

    const onSubmit = (formData) => {
        props.addPost(formData.newPostText);
    }

    return (


        <div className={s.posts}>
            <h3>My posts</h3>

            <PostReduxForm onSubmit={onSubmit} />


            <div>
                {postsElements}
            </div>

        </div>
    );
})
export default MyPosts;
