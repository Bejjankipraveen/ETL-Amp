import React, { SyntheticEvent, useState } from "react";
import { Input, Box, Grid, Button, TextField } from "@mui/material";
import { FormBody } from "../../common/types";
import Router from "next/router";
import PermanentDrawerLeft from "../drawerbar/drawerbar";

export const Form = (props: any) => {
  const { handleSubmit, headerText } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");

  const inputFieldStyle = {
    display: "block",
    width: "50%",
    margin: "30px auto",
  };

  // eslint-disable-next-line no-useless-escape, prefer-regex-literals
  const emailPattern = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const PhonenumberPattern = new RegExp(/^\d{10}$/);
  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim();

    if (name === "email") {
      if (!trimmedValue.length) {
        return "Please enter your email";
      }
      if (!emailPattern.test(trimmedValue)) {
        return "This isn't an email";
      }
    }

    if (name === "password") {
      if (!trimmedValue.length) {
        return "Please enter your password";
      }
    }

    if (name === "firstname") {
      if (!trimmedValue.length) {
        return "Please enter firstname";
      }
    }
    if (name === "lastname") {
      if (!trimmedValue.length) {
        return "Please enter lastname";
      }
    }
    if (name === "phonenumber") {
      if (!trimmedValue.length) {
        return "Please enter phone number";
      }
      // if (!PhonenumberPattern.test(trimmedValue)) {
      //   return 'Please enter 10 digit Number'
      // }
    }

    return null;
  };

  const validateForm = (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phonenumber: string
  ) => {
    const errors = {
      email: validateInput("email", email),
      password: validateInput("password", password),
      firstname: validateInput("firstname", firstname),
      lastname: validateInput("lastname", lastname),
      // phonenumber: validateInput("phonenumber", phonenumber),
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;

    return { valid, errors };
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const res = validateForm(email, password, firstname, lastname, phonenumber);
    if (!res.valid) {
    } else {
      const formBody: FormBody = {
        email,
        password,
        firstname,
        lastname,
        phonenumber,
      };
      Router.push("/dashboard");
      handleSubmit(formBody);
    }
  };

  return (
    <>
      <Grid
        container
        wrap="wrap"
        sx={{ margin: 8, backgroundColor: "#FFFFFF" }}
      >
        {/* <PermanentDrawerLeft /> */}
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginLeft: 14,

              // width: 500,
              // height: "54rem",
              // backgroundColor: "rgb(255, 255, 255)",
              // border: "2px solid rgb(171, 202, 255)",
              // textAlign: "center",
              // borderRadius: "24px",
              // padding: "2rem 1.875rem 5rem 1.875rem",
              // margin: "1.625rem",
              // boxShadow: "0 10px 60px rgb(218, 229, 255)",
            }}
          >
            {" "}
            {/* <h1 style={{ color: "black" }}>{headerText}</h1> */}
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleFormSubmit}
            >
              <h1 style={{ color: "black", fontWeight: "300px" }}>
                User Signup
              </h1>
              <div className="label_email" style={{ marginTop: "2.3rem" }}>
                <label>First Name</label>
              </div>
              {/* <TextField fullWidth  id="fullWidth" sx={{ backgroundColor:'#E2E8EA',borderRadius: '6px',fontFamily: 'Steradian', color:'rgba(43, 44, 51, 0.5)',fontWeight: '400px'}} /> */}
              <input
                className="login__input"
                id="firstname"
                name="firstname"
                placeholder="firstname"
                required={true}
                onChange={(e) => setFirstname(e.target.value)}
              />

              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label style={{ marginTop: "24rem" }}>Last Name</label>
              </div>
              <input
                className="login__input"
                id="lastname"
                name="lastname"
                required={true}
                type="lastname"
                placeholder="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />

              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label>Phone Number</label>
              </div>

              <input
                className="login__input"
                id="phonenumber"
                name="phonenumber"
                type="phonenumber"
                placeholder="phoneNumber"
                onChange={(e) => setPhonenumber(e.target.value)}
              />

              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label>Email address</label>
              </div>
              <input
                className="login__input"
                id="email"
                name="email"
                required={true}
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="label_email" style={{ marginTop: "1.3rem" }}>
                <label>Password</label>
              </div>
              <input
                className="login__input"
                id="password"
                name="password"
                required={true}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="login__submit"
                type="submit"
                style={{
                  fontFamily: "Steradian",
                  display: "block",
                  margin: "auto",
                  color: "#ffffff",
                }}
              >
                Create User
              </button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
