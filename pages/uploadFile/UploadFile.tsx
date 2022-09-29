import React, { useEffect, useState } from "react"
import { Box, Grid, Button, Alert, Stack } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import jwt from "jwt-decode"
import { useCookies } from "react-cookie"
import CloseIcon from "@mui/icons-material/Close"
import DrawerBar from "./DrawerBar"

function UploadFileComponent () {
    const [imagePath, setImagePath] = useState<string>("")
    const [loader, setloader] = useState<boolean>()
    const [userComment, setUserComment] = useState<string>("")
    const [userFile, setUserFile] = useState<string>("")
    const [error, setError] = useState<string>("");
    const [num,setNum] = useState<number>(0);

    // eslint-disable-next-line no-unused-vars
    const [cookie, setCookie, removeCookie] = useCookies(["tok"])

    const handleSubmit = async (e: any) => {
        try {
            setloader(true)
            e.preventDefault()
            const jwtToken: any = jwt(cookie.tok)
            if (jwtToken.userId) {
                const form = new FormData(e.target)
                form.append("userComment", userComment)
                form.append("userId", jwtToken.userId.toString())
                const resp = await fetch("/api/fileUpload", {
                    method: "POST",
                    body: form,
                })
                const body = await resp.json()
                if (body.uploadedImageUrl) {
                    setImagePath(body.uploadedImageUrl)
                   
                }else{
                    // console.log("body", )
                    setError(body?.message);
                }

                handdleCancel()
                

                


                
            }
        } catch (e) {
           
        }
    }

    const handdleCancel = () => {

        setloader(false)
        // document.getElementsByClassName('uploadFile__text')[0].value = null
        removeFunc()


    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded:any = event.target.files
        setUserFile(fileUploaded[0].name.replace(/ +/g, ""))
    }
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        
       if(e.target.value.length===500)
       {
           setNum(-1)
       }
    
       setNum(e.target.value.length)
    }

    const removeFunc = () => {
        setUserFile("")
    }

    return (
        <>
          {/* <DrawerBar />   */}
            <Grid
                container
                width="100%"
                height="100%"
                justifyContent="center"
                wrap="wrap"
                sx={{ backgroundColor: "rgb(245, 248, 255)" }}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "20%",
                    }}
                >
                    <Box
                        sx={{
                            width: 500,
                            height: "auto",
                            textAlign: "center",
                            padding: "2rem 1.875rem 5rem 1.875rem",
                            margin: "0.625rem",
                        }}
                    >
                        {" "}
                        <h1 style={{ color: "black" }}>User Dashboard</h1>
                        <form
                            method="POST"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-around' }}>
                                <label style={{ color: "black" }}>Your Text:</label>
                                {
                                (num<=500) ? <label style={{color:'black'}}>{num}/500</label>:''
                                }
                               
                            </div>
                            <input
                                type="text"
                                className="uploadFile__text"
                                onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{handleChangeInput(event)}}
                                maxLength={500}
                                style={{
                                    background: "#E2E8EA",
                                    borderRadius: "6px",
                                    width: "432px",
                                    padding: "10px 0 196px 10px",
                                    wordBreak:'break-word'
                                }}
                            />

                            <div
                                style={{
                                    marginTop: "31px",
                                    marginBottom: "7px",
                                    textAlign: "initial",
                                }}
                            >
                                <label style={{ color: "#35363E" }}>Upload File:</label>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: " #35363E",
                                        height: "50px",
                                        borderRadius: "32px",
                                        marginTop: "12px",
                                        "&:hover": {
                                            backgroundColor: "#35363E",
                                            cursor: "pointer",
                                        },
                                        whiteSpace: "nowrap",
                                    }}
                                    variant="contained"
                                    component="label"
                                >
                  Upload File
                                    <input
                                        name="file"
                                        className="input_file_choose"
                                        type="file"
                                        id="file-input"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </Button>

                                <p className="inputforfile"
                                    style={{
                                        color: "black",
                                        fontSize: "16px",
                                        marginLeft: "15px",
                                        wordWrap: "break-word",
                                        maxWidth: "60%",
                                    }}
                                >{`${userFile}`}</p>
                                {userFile && (
                                    <CloseIcon
                                        onClick={removeFunc}
                                        sx={{
                                            color: "black",
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "lightblue",
                                                borderRadius: "50%",
                                                padding: "2px",
                                            },
                                        }}
                                    />
                                )}
                            </div>

                            {loader ? (
                                <Stack alignItems="center">
                                    <CircularProgress />
                                </Stack>
                            ) : null}
                            <div className="uploadFile__buttons">
                                <Button
                                    size="small"
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: " #95969F",
                                        width: "111px",
                                        height: "50px",
                                        borderRadius: "32px",
                                        margin: "50px 58px 0 20px",
                                        "&:hover": {
                                            backgroundColor: "#95969F",
                                            cursor: "pointer",
                                        },
                                    }}


                                    onClick={handdleCancel}
                                >
                  Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="small"
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: " #35363E",
                                        width: "111px",
                                        height: "50px",
                                        borderRadius: "32px",
                                        margin: "50px 58px 0 20px",
                                        "&:hover": {
                                            backgroundColor: "#35363E",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                  Submit
                                </Button>
                            </div>
                        </form>
                        {imagePath ? (
                            <Alert
                                severity="success"
                                sx={{
                                    position: "absolute",
                                    right: "10px",
                                    bottom: "20px",
                                }}
                            >
                Image Uploaded Successfully.
                            </Alert>
                        ) : null}

{error ? (
              <Alert
                severity="error"
                sx={{
                  position: "absolute",
                  right: "10px",
                  bottom: "20px",
                }}
                onClose={() => {
                  setError("");
                }}
              >
                {error}
              </Alert>
            ) : null}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default UploadFileComponent;
