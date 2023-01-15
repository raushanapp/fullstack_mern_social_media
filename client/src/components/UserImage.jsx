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
                src={`http://localhost:2100/assets/${image}`}
            />
        </Box>
    );
};