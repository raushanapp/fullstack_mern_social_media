import { Box } from "@mui/material";

export const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box
            width={size}
            height={size}
        >
            <img
                style={{ objectFilt: "cover", borderRadius: "50%" }}
                alt='user'
                height={size}
                width={size}
                src={`https://mern-social-media-p49c.onrender.com/assets/${image}`}
            />
        </Box>
    );
};