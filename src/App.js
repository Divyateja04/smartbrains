import React from 'react';

import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

import Particles from 'react-particles-js';
import particlesConfig from './Config/particlesConfig';
import { SERVER_URL } from './Constants';

const initialState = {
  input: '',
  imageUrl: '',
  boxes:[], 
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
}

class App extends React.Component{
  constructor(){
    super();
    this.state = initialState;  
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
  })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box); 
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    //console.log(width, height)
    return clarifaiFaces.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height),
      }
    })
  }

  displayFaceBox = (returnedArray) => {
    //console.log("Running from displayFaceBox", returnedArray)
    this.setState({boxes: returnedArray});
  }

  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch(SERVER_URL + '/imageurl', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
            input: this.state.input //sends image link too
        })
      })//starts clarifai connection
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch(SERVER_URL + '/image', {
            method: 'put', //gets data from image end point by putting basically increments entries value
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
                id: this.state.user.id //sends id
            })
          })
          .then(resp => resp.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))//changes count to updated one
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <div className='particles'>
          <Particles height="100vh" width="100vw" params={particlesConfig} />
        </div>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
          ?<div>
            <Logo />
            <Rank entries={this.state.user.entries} name={this.state.user.name}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes}/>
          </div>
          :(
            this.state.route ==='signin' ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    )
  }

}

export default App;
