import { Home, Mail, Notifications } from '@mui/icons-material'
import { AppBar, Autocomplete, Avatar, Badge, Box, styled, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'


const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})
const Search = styled("div")(({ theme }) => ({
    // backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
}))
const Iconi = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { display: "flex" }
}))
const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { display: "none" }
}))
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const UserBox1 = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
})
// const StyledModal = styled(Modal)({
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
// })

const Splash = () => {
    return (
        <AppBar position="sticky" color='error'>
            <StyledToolbar>
                {/* <Home/> */}
                <Typography variant='h6' sx={{
                    display: { xs: "none", sm: "block" }
                }}> CRUD</Typography>
                <Home sx={{ display: { xs: "block", sm: "none" } }} />
                {/* <Search><InputBase placeholder='Search' sx={{ width: "100%" }} /></Search> */}
                <Search>
                    <form>
                        <Autocomplete
                            sx={{
                                width: "100%",
                                bgcolor: "white",
                                borderRadius: "8px"
                            }}
                            id="free-solo-demo"
                            freeSolo
                            renderInput={(params) => <TextField {...params} />}
                            // options={"hazma"}
                        />
                    </form>
                </Search>

                <Iconi>

                    <Badge badgeContent={2} color="secondary">
                        <Mail />
                    </Badge>
                    <Badge badgeContent={4} color="secondary">
                        <Notifications />
                    </Badge>
                    <Avatar sx={{ width: 30, height: 30 }}

                        src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t1.6435-9/188384323_1447601038927019_7887706600818859341_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGCL_hYTwG3k08kQD1LvB8Nsc5T_WLrH_GxzlP9Yusf8UL9sMeXCGVl0UPyrwu9aI_Jxl1QzZohUXqIXpF8s3en&_nc_ohc=7FRlBip4joUAX-tigpc&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfAwof37GJPcifAUMMjWyR4bvCvOynHtJ3UWO1Z1k0j0Pw&oe=63B01325"
                    />
                </Iconi>

                <UserBox>
                    <Avatar sx={{ width: 30, height: 30 }}
                        src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t1.6435-9/188384323_1447601038927019_7887706600818859341_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGCL_hYTwG3k08kQD1LvB8Nsc5T_WLrH_GxzlP9Yusf8UL9sMeXCGVl0UPyrwu9aI_Jxl1QzZohUXqIXpF8s3en&_nc_ohc=7FRlBip4joUAX-tigpc&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfAwof37GJPcifAUMMjWyR4bvCvOynHtJ3UWO1Z1k0j0Pw&oe=63B01325" />
                    <Typography variant='span'>Muhammad</Typography>
                </UserBox>

            </StyledToolbar>
        </AppBar>
    )
}

export default Splash