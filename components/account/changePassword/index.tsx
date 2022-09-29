import React, { SyntheticEvent, useState, useEffect } from "react";
import { Input, Box, Grid, Button, Alert } from "@mui/material";
import PermanentDrawerLeft from "../../drawerbar/drawerbar";
import axios from "axios";
// import { isSamePass } from '../../../backend/user/passwordHash'



interface DataType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePasswordComponent(user: any) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [currentPassword, SetcurrentPassword] = useState<string>("");
  const [success, Setsuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<DataType>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  //
  useEffect(() => {
    fetchdataUser();
  }, [success]);
  async function fetchdataUser() {
    let email = user?.user?.email;

    let response = await axios.get(`/api/getUserByEmail?email=${email}`);

    let { password } = response?.data?.userbyemail;
    // SetcurrentPassword(password);
    //
    // setData(fetchdata)
  }
  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim();
    // console.log("name", name,trimmedValue)
    switch (name) {
      case "currentPassword":
        if (!trimmedValue.length) {
          setError("Please enter your current password");
          return "Please enter your current password";
        }

        // console.log('pwdcheck',trimmedValue,currentPassword)
        // // let CurrentPasswordcheck =  await isSamePass(trimmedValue, currentPassword)
        // if (CurrentPasswordcheck) {
        //   setError("Please enter valid password");
        //   return "Please enter valid current password";
        // }

        break;
      case "newPassword":
        if (!trimmedValue.length) {
          setError("Please enter your new password");
          return "Please enter your new password";
        }
        break;
      case "confirmNewPassword":
        if (!trimmedValue.length) {
          setError("Please confirm your new password");
          return "Please confirm your new password";
        }
        if (data.newPassword != data.confirmNewPassword) {
          setError("confirm password and new password must be same");
          return "confirm password and new password must be same";
        }
        break;
    }
    return null;
  };

  const validateForm = () => {
    console.log('validate', data)
    const errors = {
      currentPassword: validateInput("currentPassword", data.currentPassword),
      newPassword: validateInput("newPassword", data.newPassword),
      confirmNewPassword: validateInput(
        "confirmNewPassword",
        data.confirmNewPassword
      ),
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;
    return { valid, errors };
  };

  const handleSubmit = async (formBody: any) => {
    // Over here we have to handle the form submit
console.log("form", formBody)
    formBody.email = user?.user?.email;

    let response = await axios.post("/api/passwordChange", formBody);

    if (response) {
      // document.querySelector("#currentPassword").value = null;
      // document.querySelector("#newPassword").value = null;
      // document.querySelector("#confirmNewPassword").value = null;

      Setsuccess("password updated Succesfully");
    }

    //
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const res = validateForm();

    console.log("res",res)
    if (!res.valid) {
    } else {
      const formBody: any = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };
      handleSubmit(formBody);
    }
  };

  const handleValueChange = (name: string, value: string) => {
    // eslint-disable-next-line prefer-const
    let newData: any = data;
    newData[name] = value;
    setData(newData);
  };

  const inputFieldStyle = {
    display: "block",
    width: "50%",
    margin: "30px auto",
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <PermanentDrawerLeft /> */}
      <Grid container justifyContent="center" wrap="wrap">
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              // width: 500,
              height: "auto",
              // backgroundColor: 'rgb(255, 255, 255)',
              // border: '2px solid rgb(171, 202, 255)',
              // textAlign: 'center',
              // borderRadius: '24px',
              // padding: '2rem 1.875rem 5rem 1.875rem',
              // margin: '0.625rem',
              // boxShadow: '0 10px 60px rgb(218, 229, 255)'
            }}
          >
            {/* <h1 style={{ color: 'black' }}>Change Password</h1> */}
            <form
              method="POST"
              encType="multipart/form-data"
              style={{ marginLeft: "15rem", marginTop: "7rem", width: "54rem" }}
              onSubmit={handleFormSubmit}
            >
              <h1 style={{ color: "black", fontWeight: "300px" }}>Account</h1>
              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label style={{ marginTop: "24rem" }}>Current Password </label>
              </div>
              <input
                className="login__input"
                id="currentPassword"
                name="currentPassword"
                required={true}
                type="text"
                placeholder="Current Password"
                onChange={(e) =>
                  handleValueChange("currentPassword", e.target.value)
                }
              />
              {/* <Input id='currentPassword' name='currentPassword' required={true} type="text" placeholder='Current Password' sx={inputFieldStyle} onChange={(e) => handleValueChange('currentPassword', e.target.value)} /> */}
              {/* {error ? <span style={{color:'red'}}> {error} </span>: null}  */}
              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label style={{ marginTop: "24rem" }}>New Password</label>
              </div>
              <input
                className="login__input"
                id="newPassword"
                name="newPassword"
                required={true}
                type="password"
                placeholder="New Password"
                onChange={(e) =>
                  handleValueChange("newPassword", e.target.value)
                }
              />
              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label style={{ marginTop: "24rem" }}>
                  Confirm new Password
                </label>
              </div>
              <input
                className="login__input"
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                required={true}
                placeholder="Confirm New Password"
                onChange={(e) =>
                  handleValueChange("confirmNewPassword", e.target.value)
                }
              />

              {/* <Input id='newPassword' name='newPassword' required={true} type="password" placeholder='New Password' sx={inputFieldStyle} onChange={(e) => handleValueChange('newPassword', e.target.value)} />
            <Input id='confirmNewPassword' name='confirmNewPassword' type="password"  required={true} placeholder='Confirm New Password' sx={inputFieldStyle} onChange={(e) => handleValueChange('confirmNewPassword', e.target.value)} /> */}
              {/* <Button type="submit" size="medium" sx={{ display: 'block',  color: 'black', border: '1px solid black' }}>Submit</Button> */}
              <button
                className="login__submit"
                type="submit"
                style={{
                  fontFamily: "Steradian",
                  display: "block",
                  color: "#ffffff",
                }}
              >
                Submit
              </button>
            </form>

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

            {success ? (
              <Alert
                severity="success"
                sx={{
                  position: "absolute",
                  right: "10px",
                  bottom: "20px",
                }}
                onClose={() => {
                  Setsuccess("");
                }}
              >
                {success}
              </Alert>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChangePasswordComponent;
