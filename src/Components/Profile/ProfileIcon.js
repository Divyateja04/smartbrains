import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ProfileIcon extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropDownOpen: false
        }
    }

    toggle() { 
        this.setState(prevState => ({
            dropDownOpen: !prevState.dropDownOpen
        }))
    }

    render() {
        return (
            <div class="pa4 tc">
                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} direction={"down"}>
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="span"
                    >
                        <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu 
                    className='b--transparent shadow-5' 
                    style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.5)' }}>
                        <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange("signout")}>Sign out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div> 
        )
    }
}
