import React, { Component } from 'react';

class Post extends Component{
    render(){
        let { title, content, post_image, post_id, profile_picture } = this.props.post;

        return(
            <div>
                <h1>{title}</h1>
                <img src={profile_picture} alt='post user profile'/>
            </div>
        );
    }
}

export default Post;