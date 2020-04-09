import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Nav extends Component{
    render(){
        if( this.props.location.pathname === '/' ) return null;
        let { username, profile_picture, user_id } = this.props.user;
        return(
            <div>
                <div className='user-info wrap'>
                    <span>{username}</span>
                    <img src={ profile_picture ? profile_picture : 'https://robohash.org/YZ6.png?set=set1&size=150x150' } alt='profile avatar'/>
                </div>
                <nav>
                    <ul>
                        <li><Link to='/dashboard'>Home</Link></li>
                        <li><Link to='/new'>New Post</Link></li>
                        <li><Link to='/'>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer;
    return{
        user
    }
}

export default withRouter(connect(mapStateToProps)(Nav));