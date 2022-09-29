import React, {useState, useEffect } from "react"
import {Box, Grid, Button } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import SearchIcon from "@mui/icons-material/Search"
import axios from "axios"
import jwt from "jwt-decode"
import { useCookies } from "react-cookie"
import DrawerBar from "../../pages/uploadFile/DrawerBar"
interface ProfileDataType {
  imagePath: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
}
export function DisplayFileComponent(user: any) {
    const [allimages, setAllimages] = useState<any>()
    const [cookie, setCookie, removeCookie] = useCookies(["tok"])
    const [searchItem, setSearchItem] = useState<any>("")
    useEffect(() => {
        fetchimages()
    }, [])
    const fetchimages = async () => {
        const getuserIdjwt: any = jwt(cookie.tok)
        if (getuserIdjwt.userId) {
            const response = await axios.get(
                `/api/getUsersImages?userId=${getuserIdjwt.userId}`
            )
            setAllimages(response?.data?.records)
        }
    }
    // const substring = (image: string) => {
    //     const hasNumber = /\d/
    //     let str = ""
    //     for (let i = image.length - 1; i >= 0; i--) {
    //         if (hasNumber.test(image.charAt(i))) {
    //             break
    //         }
    //         str += image.charAt(i)
    //     }
    //     return str.split("").reverse().join("")
    // }
    return (
        <>
            {/* <DrawerBar /> */}
            <Grid
                container
                justifyContent="center"
                wrap="wrap"
                sx={{
                    backgroundColor: "rgb(255, 255, 255)",
                    height: "100vh",
                    marginLeft: "10%",
                    width: "auto",
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    xl={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        sx={{
                            width: "60vw",
                            height: "100vh",
                            backgroundColor: "rgb(255, 255, 255)",
                            textAlign: "center",
                            padding: "2rem 1.875rem 5rem 1.875rem",
                            marginLeft: "4rem",
                            overflowY: "scroll",
                            scrollbarWidth: "10px",
                            scrollbarColor: "#6969DD #E0E0E0",
                        }}
                    >
                        <Box className="displayFile__search" sx={{ textAlign: "right" }}>
                            <SearchIcon
                                sx={{
                                    width: "50px",
                                    color: "black",
                                    marginBottom: "-10px",
                                    marginRight: "-7px",
                                }}
                            />
                            <input
                                type="search"
                                placeholder="Search Here"
                                onChange={(e) => {
                                    setSearchItem(e.target.value)
                                }}
                                style={{
                                    background: "#E2E8EA",
                                    borderRadius: "8px",
                                    border: "none",
                                    width: "324px",
                                    height: "36px",
                                }}
               
                
                            />
                        </Box>
                        <h1 style={{ color: "#37D9BD", textAlign: "left" }}> Files</h1>

                       
                        <div className="UserFile__Container">
                          <Box sx={{width:'100%',display:'flex'}}>
                            <List sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                              <ListItem>
                                <ListItemText sx={{color:'#37D9BD',fontSize:'18px',fontWeight:'700'}}>File Name</ListItemText>
                                </ListItem>
                                <ListItem sx={{marginRight:'184px'}}>
                                <ListItemText sx={{color:'#37D9BD',paddingLeft:'0',fontSize:'18px',fontWeight:'700'}}>Upload Time</ListItemText>
                                </ListItem>
                            </List>
                          </Box>
                            <List style={{ backgroundColor: "" }}>
                                {allimages
                                    ? allimages
                                        .filter((allimage: any) => {
                                            if (searchItem == "") {
                                                return allimage
                                            } else if (
                                                allimage?.uploaded_record_url.substring(64)
                                                    .toLowerCase()
                                                    .includes(searchItem?.toLowerCase())
                                            )
                                            {
                                                return allimage
                                            }
                                        })
                                        .map((allimage: any) => {
                                            return (
                                                <ListItem key={allimage.id} disablePadding>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            width: "100%",
                                                            height: "67px",
                                                            padding: "36px 0",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around",
                                                                alignItems: "center",
                                                                width: "100%",
                                                                borderBottom: "1px solid #C9D0D5",
                                                            }}
                                                        >
                                                            {
                                                                <ListItemText key={allimage.id+'a'}
                                                                    sx={{ color: "black", padding: "15px",flex:"1" ,wordWrap: 'break-word'}}
                                                                    primary={ allimage?.filename.substring(28)}
                                                                />
                                                            }
                                                            {
                                                                <ListItemText key={allimage.id+'b'}
                                                                    sx={{ color: "black", padding: "15px" }}
                                                                    primary={allimage?.created_date_time.slice(
                                                                        0,
                                                                        10
                                                                    )}
                                                                />
                                                            }
                                                            <Button
                                                                size="small"
                                                                onClick={() => {
                                                                    
                                                                  window.open(allimage?.uploaded_record_url, "_blank")
                                                                  
                                                                }}
                                                                sx={{
                                                                    background: "#FFFFFF",
                                                                    border: "1px solid #37D9BD",
                                                                    borderRadius: "32px",
                                                                    width: "87px",
                                                                    height: "38px",
                                                                    padding: "14px 32px",
                                                                    color: "#37D9BD",
                                                                    fontSize: "16px",
                                                                    marginRight:"30px"
                                                                }}
                                                            >
                                  View
                                                            </Button>
                                                        </span>
                                                    </div>
                                                </ListItem>
                                            )
                                        })
                                    : ""}
                            </List>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default DisplayFileComponent