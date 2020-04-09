import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllPosts, getFilteredPosts, updateState, toggleUserPosts, handleReset } from '../../redux/postReducer';
import Post from '../Post/Post';


class Dashboard extends Component{

    componentDidMount(){
        let { getAllPosts, userposts } = this.props;
        getAllPosts();
        this.setState({checked: userposts});
    }
    handleSearch = () => {
        let { user, getFilteredPosts, search, userposts } = this.props;
        getFilteredPosts( user.user_id, search, userposts );
        
    }
    updateState = e => {
        let { updateState } = this.props;
        updateState({ [e.target.name]: e.target.value })
    }
    toggleUserPosts = () => {
        let { toggleUserPosts } = this.props;
        toggleUserPosts();
    }
    handleReset = () => {
        let { handleReset } = this.props;
        handleReset();
    }
    render(){

        let mappedPosts = this.props.posts.map( (post, i) => <Post key={i} post={post} /> );

        return(
            <div>
                <div className='row'>
                    <input type='text' name='search' onChange={this.updateState} value={this.props.search}/>
                    <button onClick={this.handleSearch}>Search</button>
                    <button onClick={this.handleReset}>Reset</button>
                    <label htmlFor='my-posts'>My Posts</label>
                    <input type="checkbox" value="my-posts" checked={this.props.userposts} onClick={this.toggleUserPosts}/>
                </div>
                <div className='row'>
                    { mappedPosts.length > 0 ? mappedPosts : 'No Posts To Show' }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { user } = state.authReducer,
        { posts, search, userposts } = state.postReducer;
    return{
        posts,
        user,
        search,
        userposts
    }
}

export default withRouter( connect(
    mapStateToProps, 
    { 
        getAllPosts,
        getFilteredPosts,
        updateState,
        toggleUserPosts,
        handleReset
    } 
)(Dashboard) );