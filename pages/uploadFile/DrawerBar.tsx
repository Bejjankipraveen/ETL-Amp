import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useUser from "../../components/application/hooks/useUser";
import Router from "next/router";
import CircleIcon from "@mui/icons-material/Circle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import LockResetIcon from "@mui/icons-material/LockReset";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { borderBottom } from "@mui/system";
import { useRouter } from "next/router";

const drawerWidth = 336;

const handleLogout = () => {
  // removeCookie('tok');
  // document.cookie = 'tok=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  Router.push("/login");
};

interface Props {
  window?: () => Window;
}
export default function DrawerBar(props: Props) {
  const { window } = props;
  const user = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [opensetting, setOpensetting] = React.useState(false);
  const [select, setSelect] = React.useState<any>();
  const [title,setTitle]=React.useState<string>('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleListItemClick = (e:any,index: number) => {
    e.preventDefault()   
    if (index === 1) {
       
      Router.push("/uploadFile");
      
    }
    if (index === 2) {
      Router.push("/allFiles");
    }
    setSelect(index);
    setTitle('')
  };
 
  const handleClicksettings = () => {
    setOpensetting(!opensetting);
  };

  const handleTitle=(text:string)=>{
        setTitle(text)
        setSelect(5);
  }
  const router = useRouter();
    const drawer = (
    <div>
      <Divider />
      <List sx={{ backgroundColor: "#35363E", paddingBottom: "0",paddingTop:'0' }}>
        {[`${user?.email}`, "DASHBOARD", "FILES"].map((text, index) => (
          <ListItem
            key={index}
            sx={{ borderBottom: "1px solid #ddd", padding: "20px",backgroundColor:index == select ? "#ADD8E6" : "" ,cursor:'pointer'}}
            disablePadding
            onClick={(e:any) => handleListItemClick(e,index)}
          >
            {/* <Button
            //   className={index == select ? "btn-select" : ""}
            //   onClick={() => {
            //     setSelect(index);
            //   }}
              sx={{
                padding: "10px",
                paddingBottom: "0px",
                marginBottom: "5px",
                marginLeft: "10px",
                paddingTop: "0px",
                color: "white",
              }}
            > */}
               
               <ListItemIcon>
                {index === 0 ? (
                  <AccountCircleIcon
                    sx={{ color: "#ffffff" }}
                    className="sidebar_avatar"
                  />
                ) : index === 1 ? (
                  <CircleIcon
                    sx={{ color: "#00AE8F" }}
                    className="sidebar_green"
                  />
                ) : (
                  <CircleIcon
                    sx={{ color: "#FF813A" }}
                    className="sidebar_orange"
                  />
                )}
              </ListItemIcon>
              
              <ListItemText key={text}  primary={text} />
    
            
            {/* </Button> */}
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem
          sx={{ borderBottom: "1px solid #ddd", padding: "10px",cursor:'pointer' }}
          disablePadding
          onClick={handleClicksettings}
          key={'Settings-list'}
        >
          <ListItemButton  key={'Settings-btn'}>
            <ListItemIcon
              sx={{
                width: "32px",
                height: "32px",
                minWidth: "45px !important",
                color: "#ffffff",
              }}
              key={'Settings-icon'}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText  key={'Settings'} primary={"SETTINGS"} />
          </ListItemButton>
          {opensetting ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      <Divider />

      <Collapse in={opensetting} >
        <List>
          {["Profile", "Change Password"].map((text, index) => (
            <Link
              href={
                text == "Profile"
                  ? "/account/profile"
                  : text == "Change Password"
                  ? "/account/changePassword"
                  : ""
              }
              passHref
            >
              <ListItem
                sx={{
                  padding: "10px",
                  paddingBottom: "0px",
                  marginBottom: "5px",
                  marginLeft: "10px",
                  paddingTop: "0px",
                  backgroundColor:(title===text)? "#FF813A":'',
                  cursor:'pointer'

                }}
    
                onClick={(e:any)=>{handleTitle(text)}}
                key={index+3}
                disablePadding
              >
                <ListItemButton key={index+6}>
                  {/* <ListItemIcon>
                                { index === 0 ? <AccountCircleIcon sx={{color:'#ffffff',marginLeft:'13px'}} className="sidebar_avatar"/> :  <LockResetIcon sx={{marginLeft:'13px',color:'#ffffff'}} className="sidebar_green"/>
                                }
               </ListItemIcon> */}

                  <ListItemText key={text} primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "white", marginTop: "-10px" }} />

      {/* <Divider sx={{ bgcolor: "white" }} /> */}
      <List sx={{ backgroundColor: "#35363E" }}>
        {["LOGOUT"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={handleLogout}
            sx={{
              backgroundColor: "#35363E",
              borderBottom: "1px solid #ddd",
              padding: "10px",
              cursor:'pointer'
            }}
          >
            <ListItemButton key={'logout_btn'}>
              <ListItemIcon key={'logout_icon'} sx={{ height: "32px", width: "32px" }}>
                {index === 1 ? (
                  <InboxIcon />
                ) : (
                  <LogoutIcon sx={{ marginLeft: "6px", color: "#ffffff" }} />
                )}
              </ListItemIcon>
              <ListItemText key={'logout'} sx={{marginLeft:'-3px'}} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      {/* <CssBaseline /> */}
      {/* <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#35363E",
              color: "#FFFFFF",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
