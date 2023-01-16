import Post from "../models/post.js";
import User from "../models/user.js";

// create

export const createPost = async (req, res) => {
    const { userId, description, picturePath } = req.body;
    try {
        const user = await User.findById(userId);
        const newPost = Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();

        const post = await Post.find().lean().exec();
        res.status(201).json({
            success: true,
            post: post
        })
    } catch (error) {
        res.status(409).json({
            success: false,
            error: error.message
        });
    }
};

// Read

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().lean().exec();
        res.status(200).json({
            success: true,
            posts: posts
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
};

export const getUserPosts = async (req, res) => {
    const { userId } = req.params;
    try {
        const post = await Post.find({ userId });
        res.status(200).json({
            success: true,
            post: post
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
};

// Update

export const likePosts = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId,true)
        }

        const updatePost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
        res.status(200).json({
            success: true,
            updatePost: updatePost
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        }); 
    }
}