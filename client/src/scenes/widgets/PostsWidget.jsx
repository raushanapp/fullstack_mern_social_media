import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import { PostWidget } from "./PostWidget";
import { useEffect } from "react";

export const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);


    const getPosts = async () => {
        try {
            const responce = await fetch('https://mern-social-media-p49c.onrender.com/posts', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            let data = await responce.json();
            console.log("post get ",data)
            const post = data.posts;
            dispatch(setPosts({ posts:post }));
        } catch (err) {
            console.log({ err: err.message });
        }
    };

    const getUserPosts = async () => {
        try {
            const responce = await fetch(`https://mern-social-media-p49c.onrender.com/posts/${userId}/posts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            let data = await responce.json();
            const post = data.post;
            console.log("user post ",posts)
            dispatch(setPosts({ posts:post }));
        } catch (err) {
            console.log({ err: err.message });
        }
    };
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        }
        else {
            getPosts()
        }
    }, []);//esLint-disable-line react-hooks/exhaustive-deps;
    console.log("user post-",posts)

    return (
        <>
            {posts?.length > 0 && posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
};

