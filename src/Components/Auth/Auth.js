import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { updateState, loginUser, registerUser } from '../../redux/reducer';
import { connect } from 'react-redux';

class Auth extends Component{
    handleChange = e => {
        let { updateState } = this.props;
        updateState({[e.target.name]: e.target.value})
    }
    handleRegister = () => {
        let { username, password, registerUser } = this.props;
        registerUser( username, password );
    }
    handleLogin = () => {
        let { username, password, loginUser } = this.props;
        loginUser( username, password );
    }
    handleKeyPress = e => {
        if(e.key == 'Enter'){
            let { username, password } = this.props;
            if(username && password ){
                this.handleLogin();
            }
        }
    }
    render(){
        if( this.props.user.user_id ) return <Redirect to='/dashboard' />
        return(
            <div className='auth bg-gradient-large height-100-vh'>
                <div className='wrap'>
                    <div className='form row align-middle justify-center bg-gradient-small'>
                        <div className='column small-12'>
                            <img src='../../assets/images/download.png' alt='logo'/>
                        </div>
                        <div className='column small-12'>
                            <h1>Helo</h1>
                        </div>
                        <div className='column small-12'>
                            <label htmlFor='username'>Username:</label>
                            <input type='text' id='username' name='username' onChange={this.handleChange} />
                            <label htmlFor='password'>Password:</label>
                            <input type='password' id='password' name='password' onChange={this.handleChange} 
                            onKeyPress={this.handleKeyPress}/>
                        </div>
                        <div className='column small-12'>
                            <button onClick={ this.handleLogin }>Login</button>
                            <button onClick={ this.handleRegister }>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )                                          
    }
}

const mapStateToProps = state => {
    let { user, username, password } = state.authReducer;
    return{
        user,
        username,
        password
    }
}

export default withRouter(
    connect( 
        mapStateToProps,
        {
            loginUser,
            updateState
        } 
    )
    (Auth)
);