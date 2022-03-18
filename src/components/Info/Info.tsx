import React from 'react';
import s from './info.module.css';
import cn from 'classnames';

const Info = () => {
    return (
        <div className={s.info}>
            <div className={s.roles}>
                <div className={s.baseRoles}>
                    <h1>Base roles</h1>

                    <div className={s.pos}>
                        <h2 className={cn(s.role_org, s.role)}>Organizator</h2>
                        <p> - position, lorem ipsum dolor sit amet consectetur</p>
                    </div>

                    <div className={s.pos}>
                        <h2 className={cn(s.role_exp, s.role)}>Experienced</h2>
                        <p> - skilled user, give some useful things</p>
                    </div>


                </div>
                <div className={s.advancedRoles}>
                    <h1>Advanced roles</h1>

                    <div className={s.pos}>
                        <h2 className={cn(s.role_admin, s.role)}>Admin</h2>
                        <p> - site administration, can delete you, be careful!</p>
                    </div>
                </div>
            </div>

            <div className={s.siteInfo}>Site info</div>
        </div>
    );
}

export default Info;