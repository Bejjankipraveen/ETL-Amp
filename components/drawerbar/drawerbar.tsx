import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { useCookies } from "react-cookie";
import Router from "next/router";
import useUser from '../application/hooks/useUser'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const drawerWidth = 325;  





export default function PermanentDrawerLeft(title:any) {
  const [cookie, setCookie, removeCookie] = useCookies(["tok"]);
  const [open, setOpen] = React.useState(false);
  const [openfile, setOpenfile] = React.useState(false);
  const [opensetting, setOpensetting] = React.useState(false);
  const user = useUser()
  const handleClick = () => {
    setOpen(!open);
    setOpensetting(false)
    setOpenfile(false)
    
  };


  const handleClickfile = () => {
    setOpenfile(!openfile);
    setOpensetting(false)
    setOpen(false)
    
  };
  const handleClicksettings = () => {
    setOpensetting(!opensetting);
    setOpen(false)
    setOpenfile(false)
  };

  const handleLogout = () => {
    // console.log(window.location.host);
    removeCookie('tok');
    document.cookie = 'tok=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';    
    Router.push("/login");
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
       
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
       
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#E2E8EA"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar /> 

        <List>
    
    <ListItem > 
      <AccountCircleIcon sx={{width: 48, height: 70}}/>
      <ListItemButton>
        <ListItemText primary={user?.email}/>
        </ListItemButton>
        
    </ListItem>

</List>
        <Divider />
        <List>
          <ListItem disablePadding onClick={handleClick} sx={{"&:hover": {
                        backgroundColor: "orange",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "yellow"
                        }
                      }}}>
            <ListItemButton>
              <ListItemText primary={"Users"} />
            </ListItemButton>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
        <Divider />
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          
          {['List of users', 'Add users'].map((text, index) => (

            <Link href={text ==  'List of users' ? "/dashboard" : text ==  'Add users' ? "/addUser" :"" } passHref>
            <ListItem key={text} disablePadding>
              <ListItemButton >
               
                <ListItemText secondary={text} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        </Collapse>
        <Divider />
        <List>
          <ListItem disablePadding onClick={handleClickfile} sx={{"&:hover": {
                        backgroundColor: "orange",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "yellow"
                        }
                      }}}>
            <ListItemButton>
                <ListItemText primary={"Files"} />
                </ListItemButton>
                {openfile ? <ExpandLess /> : <ExpandMore />}
              
            </ListItem>
     
        </List>
        <Divider />
        <Collapse in={openfile} timeout="auto" unmountOnExit>
        <List>
          {['List of Files'].map((text, index) => (
             <Link href={"/adminFiles"} passHref>
            <ListItem key={text} disablePadding>
            <ListItemButton>
               
                <ListItemText secondary={text} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
          
        </List>
        </Collapse>
        <Divider />
        <List>
          <ListItem disablePadding onClick={handleClicksettings} sx={{"&:hover": {
                        backgroundColor: "orange",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "yellow"
                        }
                      }}}>
            <ListItemButton>
               
                <ListItemText primary={"Settings"} />
                </ListItemButton>
                {opensetting ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
     
        </List>
        <Divider />
        <Collapse in={opensetting} timeout="auto" unmountOnExit>
        <List>
          {['Profile', 'Change Password'].map((text, index) => (
            <Link href={text ==  'Profile' ? "/account/profile" : text ==  'Change Password' ? "/account/changePassword" :"" } passHref>
            <ListItem key={text} disablePadding>
              <ListItemButton>
               
                <ListItemText  
secondary={text} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        </Collapse>

        <Divider />
        <List>
          <ListItem disablePadding sx={{"&:hover": {
                        backgroundColor: "orange",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "yellow"
                        }
                      }}}>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
         {/* <DenseTable /> */}
       
      </Box>
    </Box>
  );
}