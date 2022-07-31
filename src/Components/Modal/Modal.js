import React from "react";
import ReactDOM from "react-dom";
import './Model.css';

const modelRoot = document.getElementById('model-root');

class Model extends React.Component{
    constructor(props){
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount(){
        modelRoot.appendChild(this.el);
    }

    componentWillUnmount(){
        modelRoot.removeChild(this.el);
    }

    render(){
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Model;