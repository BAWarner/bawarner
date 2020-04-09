const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const db = req.app.get('db');

    let { username, password } = req.body;

    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync( password, salt );

    var user = await db.auth.registerUser( username, hash );

    let { user_id, username: un } = user[0];

    req.session.user = {
        user_id,
        username: un
    }

    res
    .status(200)
    .send(req.session.user);
}

const login = async (req, res) => {
    const db = req.app.get('db');

    let { username, password } = req.body;

    var user = await db.auth.loginUser( username );

    if(user.length > 0){
        let hashed = user[0].password;
        var areEqual = await bcrypt.compareSync(password, hashed);

        if(areEqual){
            let { user_id, username: un, profile_picture } = user[0];
            req.session.user = {
                user_id,
                username: un,
                profile_picture
            }
    
            res
            .status(200)
            .send(req.session.user);
        }else{
            res
            .status(400)
            .send('Sorry, username or password is not correct');
        }
    }else{
        res
        .status(404)
        .send('Sorry, that usename was not found in our Database');
    }

}

const logOut = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const retrieveUser = (req, res) => {
    res
    .status(200)
    .send(req.session.user);
}

const getAllPosts = async (req, res) => {
    const db = req.app.get('db');

    var posts = await db.posts.getAllPosts();

    res
    .status(200)
    .send(posts);

}

const getFilteredPosts = async (req, res) => {
    const db = req.app.get('db');
    var user_id = req.params.id,
        { search, userposts } = req.query,
        posts;
    console.log({user_id, search, userposts});
    if( user_id !== 'null' ){
        posts = await db.posts.getFilteredPosts(user_id);
        if(search){
            posts = posts.filter( post => post.title.includes(search) )
        }
    }else{
        posts = await db.posts.getAllPosts();
    }


    res
    .status(200)
    .send(posts)
}

module.exports = {
    registerUser,
    login,
    retrieveUser,
    logOut,
    getAllPosts,
    getFilteredPosts
}