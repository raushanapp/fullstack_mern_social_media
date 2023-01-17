import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";

import { Box, Divider, IconButton, useTheme, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Friend } from "components/Friend";
import { WidgetsWrapper } from "components/WidgetsWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";


export const PostWidget = ({
    postId,
    postUserId,
    name, 
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length; 
    // console.log("user loggedId",loggedInUserId)
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // console.log("postUserId...",postUserId,)

    const patchLike = async () => {
        try {
            const responce = await fetch(`https://mern-social-media-p49c.onrender.com/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUserId })
            });
            const data = await responce.json();
            const updatePost = data.updatePost;
            // console.log("updatepost", updatePost);
            dispatch(setPost({ post: updatePost }));
        } catch (err) {
            console.log({ err: err.message })
        }
    };

    return (
        <WidgetsWrapper m='2rem 0'>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{mt:"1rem"}}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width='100%'
                    height='auto'
                    alt='post'
                    style={{ borerRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`https://mern-social-media-p49c.onrender.com/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt='0.25rem'>
                <FlexBetween gap='1rem'>
                    {/* this likes section */}
                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{color:primary}} />
                            ) : (
                                <FavoriteBorderOutlined/>
                          )}
                        </IconButton>
                        <Typography>{ likeCount}</Typography>
                    </FlexBetween>
                    {/* this is comment sections */}

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={()=>setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined/>   
                        </IconButton>
                        <Typography>{ comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>
                <IconButton>
                    <ShareOutlined/>
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt='0.5rem'>
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{color:main,m:"0.5rem",pl:"1rem"}}>
                               {comment}
                            </Typography>
                       </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetsWrapper>
    )
}