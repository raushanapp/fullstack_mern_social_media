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
            const responce = await fetch(`http://localhost:2100/posts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            let data = await responce.json();
            const posts = data.posts;
            dispatch(setPosts({ posts }));
        } catch (err) {
            console.log({ err: err.message });
        }
    };

    const getUserPosts = async () => {
        try {
            const responce = await fetch(`http://localhost:2100/posts/${userId}/posts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            let data = await responce.json();
            const posts = data.post;
            dispatch(setPosts({ posts }));
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
    }, []);//esLint-disable-line react-hooks/exhaustive-deps

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
                    occupation,
                    picturePath,
                    userPicutrePath,
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
                        picturePath={picturePath={}}
                        userPicutrePath={userPicutrePath={}}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
};

