import React from 'react'
import ProfileIcon from '../Profile/ProfileIcon';

export default function Navigation({ isSignedIn, onRouteChange, toggleModal }) {
    
    if(isSignedIn){
        return (
            <div>
                <nav style={{display:'flex',justifyContent: 'flex-end'}}>
                    <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
                    {/* <p onClick={() => onRouteChange("signout")} className='f3 link dim black underline pa3 pointer'>Sign out</p> */}
                </nav>
            </div>
        );
    } else {
        return (
            <div>
                <nav style={{display:'flex',justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange("signin")} className='f3 link dim black underline pa3 pointer'>Sign in</p>
                    <p onClick={() => onRouteChange("register")} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            </div>
        );
    }
}
