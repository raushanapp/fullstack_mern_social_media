import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";

import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import { UserImage } from "./UserImage";
import { useNavigate } from "react-router-dom";

export const Friend = ({friendId,name,subtitle,userPicturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    console.log("friends____",friends)

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
     
    // console.log("friendId...", friendId,"_id",_id);
    const isFriend = friends?.find((friend) => friend._id === friendId);
    // console.log(isFriend,"friend id----")

    const patchFriend = async () => {
        try {
            const responce = await fetch(`https://mern-social-media-p49c.onrender.com/users/${_id}/${friendId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await responce.json();
            const friend = data.friends;
            console.log(friend,"friend");
            dispatch(setFriends({ friends:friend }));
            
        } catch (err) {
            console.log({ err: err.message })
        }
    };

    return (
        <FlexBetween>
            <FlexBetween gap='1rem'>
                <UserImage image={userPicturePath} size='55px' />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant='h5'
                        fontWeight='500'
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor:"pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize='0.25rem'>{subtitle}</Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx={{backgroundColor:primaryLight,p:"0.6rem"}}
            >
                {isFriend ? (<PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />     
                )
                }
            </IconButton>
        </FlexBetween>
    )
}