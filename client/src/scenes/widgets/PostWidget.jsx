import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlines,
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
    likes,
    comments,
}) => {
    const [isCommnets, setIsCommnets] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length; 

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        try {
            const responce = await fetch(`http://localhost:2100/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUserId })
            });
            const data = await responce.json();
            const updatePost = data.updatePost;
            dispatch(setPost({ post: updatePost }));
        } catch (err) {
            console.log({ err: err.message })
        }
    };

    return (
        <WidgetsWrapper m='2rem 0'>
            <Friend
                friendId={postUserId}
                
            />
        </WidgetsWrapper>
    )
}