import { Box, Typography, useTheme } from "@mui/material";
import { Friend } from "components/Friend";
import { WidgetsWrapper } from "components/WidgetsWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";
import { useEffect } from "react";

export const FriendListWidget = ({userId}) => {
    const dispatch = useDispatch();
    const {palette}= useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFreinds = async () => {
        try {
            const response = await fetch(`https://mern-social-media-p49c.onrender.com/users/${userId}/friends`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            const friend = data.friends;
            dispatch(setFriends({ friends: friend }));
        } catch (error) {
            console.log({ error: error.message });
        }
    };
    useEffect(() => {
        getFreinds();
    }, []);//esLint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetsWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight='500'
                sx={{mb:"1.5rem"}}
            >
                Friend List
            </Typography>
            <Box
                display='flex'
                flexDirection="column"
                gap='1.5rem'
            >
                {friends?.length > 0 && friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                )) }
            </Box>
        </WidgetsWrapper>
    )
}