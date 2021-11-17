import React, { Suspense, useEffect} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/formsControls/formsControls';
import { maxLengthCreator, required } from '../../utils/valdators';
import s from './myPosts.module.css';
import Post from './Post/Post';
import { NavLink } from "react-router-dom";
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Preloader from '../../common/preloader/preloader';
import photog from '../../../assets/images/icon_photo.svg';
import voice from '../../../assets/images/voice_icon.svg';
import text from '../../../assets/images/text_icon.svg';

const maxLength20 = maxLengthCreator(20);

const PostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"New post"} name={"newPostText"} component={Textarea} validate={[required, maxLength20]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const MyPost = (props) => {
    return (
        <div>
            All Post
        </div>
    );
}

const FriendsPost = (props) => {
    return (
        <div>
            Friends Post
        </div>
    );
}

const Wants = (props) => {
    return (
        <div>
            Wants
        </div>
    );
}

const PostReduxForm = reduxForm({ form: 'myPostForm' })(PostForm);

let MyPosts = React.memo(({ profile, fullnes, setFullnes, ...props }) => {

    useEffect( () => {
        setFullnes(profile);
    }, [setFullnes, profile]);

    console.log(fullnes);
    let path = "";

    if (profile) {
        if (profile.userId && profile.userId !== 2) {
            path = "/profile/" + profile.userId + "/me";
        }
        else {
            path = "/profile";
        }
    }
    else {
        path = "/profile";
    }

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.mess} name={p.name} age={p.age} />);

    const onSubmit = (formData) => {
        props.addPost(formData.newPostText);
    }

    return (
        <div className={s.myPosts}>
            <div className={s.aboutProfile}>
                <div className={s.mainInfo}>
                    <div className={s.aboutMe}>
                        <h1>About me</h1>
                        <p>{profile && profile.lookingForAJobDescription}</p>
                    </div>

                    <div className={s.aboutAll}>
                        <div className={s.about}>
                            <h1>Joined</h1>
                            <h2>{profile && profile.joined ? profile.joined : 'March 26th, 2017'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>City</h1>
                            <h2>{profile && profile.city ? profile.city : 'Kyiv'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>Country</h1>
                            <h2>{profile && profile.country ? profile.country : 'Ukraine'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>Age</h1>
                            <h2>{profile && profile.age ? profile.age : '27'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>Web</h1>
                            <h2>{profile && profile.website ? profile.website : 'www.site.com'}</h2>
                        </div>
                    </div>
                </div>

                <div className={s.personalInfo}>
                    <h1 className={s.personalCaption}>Personal Info</h1>
                    <div className={s.aboutAll}>
                        <div className={s.about}>
                            <h1>Email</h1>
                            <h2>{profile && profile.joined ? profile.joined : 'lyshtvanvlad'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>Birthday</h1>
                            <h2>{profile && profile.city ? profile.city : 'May 23th, 2002'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>Place</h1>
                            <h2>{profile && profile.birthday ? profile.birthday : 'Ukraine, Kyiv'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>User Id</h1>
                            <h2>{profile && profile.userId ? profile.userId : 'None'}</h2>
                        </div>

                        <div className={s.about}>
                            <h1>Phone</h1>
                            <h2>{profile && profile.phone ? profile.phone : '+380689121275'}</h2>
                        </div>

                        
                    </div>
                </div>
            </div>

            <div className={s.allPosts}>
                <div className={s.postForm}>
                    <textarea name="" id="" placeholder="Hi! Share your post hear..."></textarea>

                    <div className={s.postButtons}>
                        <div className={s.postTags}>
                            <img src={text} alt="" />
                            <img src={photog} alt="" />
                            <img src={voice} alt="" />
                        </div>
                        <div className={s.allButtons}>
                            <button className={s.buttonDiscard}>Discard</button>
                            <button className={s.buttonPost}>Post</button>
                        </div>

                    </div>
                </div>




                <div className={s.captions}>
                    <div className={s.caption}>
                        <NavLink exact to={path} activeClassName={s.active}><p>All posts</p></NavLink>
                    </div>
                    <div className={s.caption}>
                        <NavLink to={path + '/my'} activeClassName={s.active}><p>My posts</p></NavLink>
                    </div>
                    <div className={s.caption} >
                        <NavLink to={path + '/friends'} activeClassName={s.active}><p>Friends posts</p></NavLink>
                    </div>
                    <div className={s.caption} >
                        <NavLink to={path + '/wants'} activeClassName={s.active}><p>Wants{props.authorizedUserId}</p></NavLink>
                    </div>
                </div>

                <div className={s.posts}>
                    <Suspense fallback={<Preloader />}>
                        <Switch>
                            <Route exact path={path} render={() => <PostReduxForm onSubmit={onSubmit} />} />
                            <Route path={path + '/my'} render={() => <MyPost />} />
                            <Route path={path + '/friends'} render={() => <FriendsPost />} />
                            <Route path={path + '/wants'} render={() => <Wants />} />
                        </Switch>
                    </Suspense>

                    <div>
                        {postsElements}
                    </div>
                </div>
            </div>

            <div className={s.stats}>
                <div className={s.profileFullnes}>
                    <h1>{fullnes}%</h1>
                    <h2>Profile Completion</h2>
                    <h3>{}</h3>
                    <p>Complete your profile by filling profile info fields, completing quests and unlocking badges</p>
                </div>
            </div>

        </div>
    );
})
export default MyPosts;
