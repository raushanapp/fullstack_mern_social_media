import {Box,Typography,useTheme,useMediaQuery} from "@mui/material"
import { Form } from "./Form";
export const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return <Box>
        <Box
            width='100%'
            backgroundColor={theme.palette.background.alt}
            p='1rem 6%'
            textAlign='center'
        >
            <Typography
                fontWeight="bold"
                fontSize="32px"
                color="primary"
            >
             SocialMedia
            </Typography>
        </Box>
        {/* form  */}
        <Box
            width={isNonMobileScreens ? "50%" : "93%"} 
            p='2rem'
            m="1rem auto"
            borderRadius='1.5rem'
            backgroundColor={theme.palette.background.alt}
        >
            <Typography
                fontWeight='500'
                variant='h5'
                sx={{mb:"1.5rem"}}
            >
                Welcome to SocialMedia, the Social Media for Sociopath! 
           </Typography>
            <Form/>
        </Box>
    </Box>
    
}