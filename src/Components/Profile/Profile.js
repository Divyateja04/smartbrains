import React from "react";
import { useState } from "react";
import './Profile.css';
import { SERVER_URL } from "../../Constants";

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
    const [age, setAge] = useState(user.age);
    const [name, setName] = useState(user.name);
    const [pet, setPet] = useState(user.pet);

    const onAgeChange = (e) => {
        setAge(e.target.value);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onPetChange = (e) => {
        setPet(e.target.value);
    }

    const onProfileUpdate = (data) => {
        fetch(SERVER_URL + /profile/ + user.id, {
            method: 'post',
            headers: {
                'Content-type':'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({ formInput: data })
        }).then(resp => {
            if(resp.status === 200 || resp.status === 304){
                toggleModal();
                loadUser({...user, ...data})
            }
        }).catch(console.log)
    }

    return (
    <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
            <main className="pa4 black-80">
                <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-100 ba h3 w3 dib" alt="avatar" />
                <h1>{name}</h1>
                <h4>{`Images Submitted: ${user.entries}`}</h4>
                <p>{`Member Since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                <div className="measure">
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Update User Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="user-name"  
                        id="name" 
                        placeholder={name}
                        onChange={onNameChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="age">Update Age</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="age"  
                        id="age"
                        placeholder={age}
                        onChange={onAgeChange}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="pet">Update Pet Name</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="pet" 
                        name="pet" 
                        id="pet"
                        placeholder={pet}
                        onChange={onPetChange}/>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "space-evenly", }}>
                        <input
                            onClick={() => onProfileUpdate({
                                name: name,
                                age: age,
                                pet: pet
                            })}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Submit"/>
                        <input
                            onClick={toggleModal}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Cancel"/>
                    </div>
                </div>
            </main>
            <div className="modal-close" onClick={toggleModal}>&times;</div>
        </article>
    </div>
    )
}

export default Profile;