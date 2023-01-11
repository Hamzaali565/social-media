import React, { useContext, useEffect } from 'react'
import { EmojiEmotions, ExpandMore, Group, Home, Image, Share, Mail, Margin, Message, Notifications, PersonAdd, Place, PlayArrow, PlayCircle, Storefront, VideoCameraBack, YouTube, Favorite, MoreVert, Drafts, Send, Inbox, StarBorder, ExpandLess, LiveTv, SportsEsports, CheckBox, FavoriteBorder, ToggleOffOutlined, Mode, ModeNight, PagesOutlined } from '@mui/icons-material'
import { Box } from '@mui/system'
import axios from 'axios';
import moment from 'moment'
import {
  Alert,
  AppBar, Autocomplete, Avatar, AvatarGroup, Badge, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, CircularProgress, Collapse, Divider, FormControl, Icon, IconButton, ImageList, ImageListItem, Input,
  InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Modal, Select, Snackbar, Stack, styled, Switch, TextField, Toolbar, Typography
} from '@mui/material'
import { red } from '@mui/material/colors'
import SwitchBase from '@mui/material/internal/SwitchBase'
import { useState } from 'react'
import { GlobalContext } from '../context/Context';
import { Link, useNavigate } from "react-router-dom";
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
const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})




const Navbar = () => {


  let { state, dispatch } = useContext(GlobalContext);
  const [description, setDescription] = useState("");
  const [ray1, setRay1] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const [chapli, setchapli] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState("")
  const [pLoad, setPLoad] = useState(false);
  const [byName, setByName] = useState("");
  const [loader, setLoader] = useState(false)
  const [opens, setOpens] = useState(false);
  const [mtype, setMtype] = useState("")
  const [messages, setMessages] = useState("")
  let navigate = useNavigate();

  let Objs = {
    description: description,
  }
  let Objt = {
    description: isEditingDescription,
  }


  const deletePost = () => {
    setLoader(true)

    axios.delete(`${state.baseUrl}/api/v1/tweet/${del}`, { withCredentials: true })
      .then(response => {
        // console.log(response.data);
        // setLoader(false);
        setPLoad(!pLoad)
        setOpens(true)
        setMtype("success")
        setMessages("Tweet Deleted Successfully")
      })
      .catch(err => {
        setLoader(false)
        setOpens(true)
        setMtype("error")
        setMessages("Tweet Not Deleted Successfully")
        // console.log("err", err);
      })
  }
  const handlerChange = (e) => {
    e.preventDefault();
    axios.post(`${state.baseUrl}/api/v1/tweet`, Objs, { withCredentials: true })
      .then(response => {
        // console.log(response.data.data);
        setPLoad(!pLoad)
        setOpens(true)
        setMtype("success")
        setMessages("Tweet Uploaded Successfully")
        // setRay1(response.data.data)
      })
      .catch(err => {
        console.log("err", err);
        setOpens(true)
        setMtype("error")
        setMessages("Tweet Not Uploaded Successfully")
      })
  }

  const Product = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${state.baseUrl}/api/v1/tweet/${byName}`, { withCredentials: true });
      setRay1(response.data.data)
      // console.log(response.data.data);
      // setistrue(!istrue);
    } catch (err) {
      console.log("err", err);
    }
  };

  const getAllPost = () => {
    setLoader(true);
    axios.get(`${state.baseUrl}/api/v1/tweets`, { withCredentials: true })
      .then(response => {
        setLoader(false);
        // console.log("allDAta", response.data.data);
        setRay1(response.data.data)
        // console.log("setRay1 :", ray1);

      })
      .catch(err => {
        // console.log("err", err);
        setLoader(false)
        setOpens(true)
        setMtype("error")
        setMessages("Server Error Please try Later")
      })
  };

  useEffect(() => {
    getAllPost();
  }, [pLoad])

  const updation = (e) => {
    e.preventDefault();
    setLoader(true)
    setchapli(false)
    axios.put(`${state.baseUrl}/api/v1/tweet/${isEditing}`, Objt, { withCredentials: true })
      .then(response => {
        // console.log("allDAta", response.data.data);
        setPLoad(!pLoad);
        setOpens(true);
        // setLoader(false)
        setMtype("success")
        setMessages("Tweet Updated Successfully")
      })
      .catch(err => {
        // console.log("err", err);
        setOpens(true)
        setLoader(false)
        // setPLoad(!pLoad)
        setMtype("error")
        setMessages("Tweet Not Updated Successfully")
      })
  }
  const edit = () => {
    setchapli(true)
  }


  const handleClose = (event, reason) => {
    // e.preventDefault();
    if (reason === 'clickaway') {
      return;
    }

    setOpens(false);
  };

  const homeOut = async () => {
    try {
      let response = await axios.post(`${state.baseUrl}/api/v1/logout`, {}, { withCredentials: true })
      console.log("res", response);
      dispatch({
        type: 'USER_LOGOUT'
      })
    }
    catch (e) {
      console.log("e: ", e);
    }
  }
  const profilePage = () => {
    let path = '/profilePage'
    navigate(path)
  }
  return (
    <div>
      <AppBar position="sticky" color='error'>
        <StyledToolbar>
          {/* <Home/> */}
          <Typography variant='h6' sx={{
            display: { xs: "none", sm: "block" }
          }}> CRUD</Typography>
          <Home sx={{ display: { xs: "block", sm: "none" } }} />
          {/* <Search><InputBase placeholder='Search' sx={{ width: "100%" }} /></Search> */}
          <Search>
            <form onSubmit={Product}>
             <Input
             sx={{backgroundColor:"white", width:"100%", borderRadius:"10px", padding:"10px"}}
             placeholder= "Search Here"
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
              onClick={(e) => {
                setOpen(true)
              }}
            />
          </Iconi>

          <UserBox>
            <Avatar sx={{ width: 30, height: 30 }}
              onClick={(e) => {
                setOpen(true)
              }}
              src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t1.6435-9/188384323_1447601038927019_7887706600818859341_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGCL_hYTwG3k08kQD1LvB8Nsc5T_WLrH_GxzlP9Yusf8UL9sMeXCGVl0UPyrwu9aI_Jxl1QzZohUXqIXpF8s3en&_nc_ohc=7FRlBip4joUAX-tigpc&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfAwof37GJPcifAUMMjWyR4bvCvOynHtJ3UWO1Z1k0j0Pw&oe=63B01325" />
            <Typography variant='span'>Muhammad</Typography>
          </UserBox>

        </StyledToolbar>
      </AppBar>

      {/* Sidebar */}
      <Stack direction="row" spacing={2}>
        <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>

          <Box position={"fixed"}>
            <List
              // sx={{bgcolor:"none"}}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={<ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>



              <ListItemButton>
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary="Marketplace" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Group" />
              </ListItemButton>
              <ListItemButton>

                <ListItemIcon>
                  <PlayCircle />
                </ListItemIcon>
                <ListItemText primary="Watch" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <SportsEsports />
                </ListItemIcon>
                <ListItemText primary="Fun" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <LiveTv />
                </ListItemIcon>
                <ListItemText primary="Streaming" />
              </ListItemButton>

              {/* Switch */}
              <ListItem disablePadding>
                <ListItemButton component="a" href='#switch'>
                  <ListItemIcon>
                    <ModeNight />
                  </ListItemIcon>
                  <Switch />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        {/* Feed */}

        <Box bgcolor={'whitesmoke'} flex={4} p={2}>
          <Box>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              mt: "10px"
            }}>
              <Box flex={1} height={280} bgcolor={"background.default"} color={"text.primary"}
                p={3} border="1px solid black"
                pb={5}
                // sx={{ border: { xs: "none", sm: "block", md: "block" } }}
                borderRadius={5}>
                <Typography variant='h6' color='gray' textAlign='center'>Create Post</Typography>
                <UserBox1>
                  <Avatar sx={{ width: 40, height: 40 }}
                    src="https://scontent.fkhi22-1.fna.fbcdn.net/v/t1.6435-9/188384323_1447601038927019_7887706600818859341_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGCL_hYTwG3k08kQD1LvB8Nsc5T_WLrH_GxzlP9Yusf8UL9sMeXCGVl0UPyrwu9aI_Jxl1QzZohUXqIXpF8s3en&_nc_ohc=7FRlBip4joUAX-tigpc&_nc_ht=scontent.fkhi22-1.fna&oh=00_AfAwof37GJPcifAUMMjWyR4bvCvOynHtJ3UWO1Z1k0j0Pw&oe=63B01325" />
                  <Typography fontWeight={500} variant="span">{state?.user?.firstName} {state?.user?.lastName}</Typography>
                </UserBox1>
                <form onSubmit={handlerChange} sx={{ width: "100%" }}>

                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) => { setDescription(e.target.value) }}
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder="What is in your Mind"
                    variant="standard" />

                  <Stack direction='row' gap={1} mt={2} mb={3}>
                    <EmojiEmotions color='primary' />
                    <Image color='secondary' />
                    <VideoCameraBack color='success' />
                    <PersonAdd color='error' />
                  </Stack>
                  <ButtonGroup fullWidth
                    variant='contained'
                    aria-label='outlined primary button group'>

                    <Button type='submit'>Post</Button>
                    <Button onClick={() => getAllPost()}
                    >Get All Post</Button>
                  </ButtonGroup>
                </form>
              </Box>
            </Box>
          </Box>

          <Box flex={1} mt="20px">
            {
              ray1?.map((eachItem, i) => (
                <Card key={i} sx={{
                  height: { xs: "400", sm: "400", md: "500", lg: "500" },
                  marginTop: "10px"
                }}>
                  <CardHeader
                    avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>}
                    action={<IconButton aria-label="settings">
                      {/* <MoreVert /> */}
                      {(chapli === false) ?
                        <Select sx={{ mr: "10px" }} onFocus={() => { setDel(eachItem?._id) }}>
                          <MenuItem

                            onClick={() => {
                              setIsEditing(eachItem._id)
                              setIsEditingDescription(eachItem.description)
                              edit()
                            }
                            }
                          >Edit</MenuItem>
                          <MenuItem
                            onClick={() => deletePost()}
                          >Delete
                          </MenuItem>
                        </Select>
                        :
                        null
                      }
                    </IconButton>}
                    title={`${state?.user?.firstName} ${state?.user?.lastName}`}
                    subheader={moment(eachItem.createdOn).fromNow()} />
                  <Box
                    height={300}

                    sx={{
                      height: { xs: "200", sm: "300", md: "300", lg: "300" },
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      src="https://mui.com/static/images/cards/paella.jpg"
                      alt="Paella dish"
                      width="95%"
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" mb={0}>
                      <b>Description</b>: {
                        (eachItem._id === isEditing && chapli === true) ?
                          <Box
                            onSubmit={updation}
                            component="form"
                            // sx={{
                            //   '& > :not(style)': { m: 1, width: '25ch' },
                            // }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="standard-basic"
                              label="update your description"
                              variant="standard"
                              value={isEditingDescription}
                              onChange={(e) => setIsEditingDescription(e.target.value)}
                              placeholder="Input Your Description"
                            />
                            <Button type='submit' sx={{ mt: "10px" }}>Update</Button>

                          </Box>
                          :
                          (chapli === false) ? eachItem?.description : null
                      }

                      <Typography variant='body2' color="text.secondary" mt={2}>
                        <b>Price</b>: 10$
                      </Typography>
                    </Typography>

                  </CardContent>

                  <CardActions disableSpacing sx={{ mt: "0px", paddingTop: "0px" }}>
                    <IconButton aria-label="add to favorites">
                      {/* <CheckBox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}}/>}/> */}
                      <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                    </IconButton>

                    <IconButton aria-label="share">
                      <Share />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
          </Box>
          {/* // */}
        </Box>

        {/* rightbar */}
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <Box position={"fixed"} >
            <Typography variant='h6' sx={{ fontWeight: "100", color: "gray" }}>Friends Online</Typography>

            <Box mt={1} ml={1} flex={1}>
              <AvatarGroup max={6} sx={
                {
                  display: "flex",
                  justifyContent: "flex-start",


                }
              }>
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFacn0pb12vsSRTPKRUDnxFrP8sj7st13r8A&usqp=CAU" />
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx8A3uphj1-B-CSCqWLoVclcaPYjz98VQhvZrRTCKz&s" />
                <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
                <Avatar alt="Travis Howard" src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg" />
                <Avatar alt="Cindy Baker" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnx7EbbrFw1MSD9hRLmySprvKEBYFBMFS1g&usqp=CAU" />
                <Avatar alt="Agnes Walker" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1rLseZTJ6YRzvVJvjULknsz76zHB6as7eA&usqp=CAU" />
                <Avatar alt="Trevor Henderson" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFacn0pb12vsSRTPKRUDnxFrP8sj7st13r8A&usqp=CAU" />
              </AvatarGroup>
            </Box >
            <Typography variant='h6' sx={{ fontWeight: "100", color: "gray", mt: 2 }}>
              Latest Uploads
            </Typography>
            <Box>
              <ImageList sx={{ mt: 2 }} rowHeight={100} cols={3} gap={5}>

                <ImageListItem>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFN15yp0gUlzbS78QZgGOb75G6r9_y6Qi5-mk5QGjU&s" alt="" />
                </ImageListItem>

                <ImageListItem>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUq9w4j8QdjaGd6X318LZe0uYnakMx0FEDyl4Iye1x&s" alt="" />
                </ImageListItem>

                <ImageListItem>
                  <img src="https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073__340.jpg" alt="" />
                </ImageListItem>
              </ImageList>
            </Box>
            <Typography variant='h6' sx={{ fontWeight: "100", color: "gray", mt: 2 }}>
              Latest Conversartions
            </Typography>

            <Box>
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFacn0pb12vsSRTPKRUDnxFrP8sj7st13r8A&usqp=CAU" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnx7EbbrFw1MSD9hRLmySprvKEBYFBMFS1g&usqp=CAU" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Agnes Walker" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1rLseZTJ6YRzvVJvjULknsz76zHB6as7eA&usqp=CAU" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>

            </Box>

          </Box>
        </Box>
      </Stack>
      <StyledModal
        open={loader}
        // onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <CircularProgress />
        </Box>
      </StyledModal>

      <Stack spacing={2} sx={{ width: '100%' }}>
        {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
        <Snackbar open={opens} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={mtype} sx={{ width: '100%' }}>
            {messages}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert> */}
        {/* <Alert severity="success">This is a success message!</Alert> */}
      </Stack>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => { setOpen(false) }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={(e) => {
          setOpen(false)
          profilePage()
        }}>Profile</MenuItem>
        <MenuItem onClick={(e) => setOpen(false)}>My account</MenuItem>
        <MenuItem onClick={(e) => setOpen(false)}><Link style={{textDecoration:"none", color:"black"}} to={'/change-password' }>Change Password</Link></MenuItem>
        <MenuItem onClick={(e) => {
          setOpen(false)
          homeOut();
        }}>Logout</MenuItem>
      </Menu>
    </div >
  )
}

export default Navbar;