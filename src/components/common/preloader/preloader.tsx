import React from 'react';
import preloader from '../../../assets/images/spinner.svg';

let Preloader: React.FC = () => {
    return <div>
        <img src={preloader} alt=""/>
    </div>
}

export default Preloader;