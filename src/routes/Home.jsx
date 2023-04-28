import React from 'react';
import Profile from '../components/Profile';
import Repos from '../components/Repos'

const Home = () => {
    return <div className='github'>
        <Profile/>
        <Repos/>
    </div>
}

export default Home