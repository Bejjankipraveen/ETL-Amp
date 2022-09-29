import React, { SyntheticEvent, useState } from "react";
import { Box, Grid } from "@mui/material";
import { FormBodyLogin } from "../../common/types";

export const FormLogin = (props: any) => {
  const { handleSubmit, headerText } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputFieldStyle = {
    // display: 'block',
    // width: '50%',
    margin: "0 0 44px 0",
  };

  // eslint-disable-next-line no-useless-escape, prefer-regex-literals
  const emailPattern = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim();

    if (name === "email") {
      if (!trimmedValue.length) {
        return "Please enter your email";
      }
      if (!emailPattern.test(trimmedValue)) {
        return "This isn’t an email";
      }
    }

    if (name === "password") {
      if (!trimmedValue.length) {
        return "Please enter your password";
      }
    }

    return null;
  };

  const validateForm = (email: string, password: string) => {
    const errors = {
      email: validateInput("email", email),
      password: validateInput("password", password),
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;
    return { valid, errors };
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const res = validateForm(email, password);
    if (!res.valid) {
    } else {
      const formBody: FormBodyLogin = {
        email,
        password,
      };
      handleSubmit(formBody);
    }
  };

  return (
    <>
      <div className="LoginForm_Container" style={{ height: "100%" }}>
        <Grid
          container
          width="100%"
          height="100%"
          justifyContent="center"
          display="flex"
          textAlign="center"
          sx={{ backgroundColor: "#C6C6C6" }}
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
                width: 500,
                height: "auto",
                backgroundColor: "#C6C6C6",
                textAlign: "center",
                padding: "2rem 1.875rem 5rem 1.875rem",
                margin: "0.625rem",
              }}
            >
              <h1
                className="Header__login"
                style={{ color: "black", marginBottom: "60px" }}
              >
                {headerText}
              </h1>
              <form
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
              >
                <div className="label_email">
                  <label>Email address</label>
                </div>
                <input
                  className="login__input"
                  id="email"
                  name="email"
                  required={true}
                  type="text"
                  placeholder="abc@example.com"
                  style={inputFieldStyle}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="label_password">
                  <label>Password</label>
                </div>
                <input
                  className="login__password"
                  id="password"
                  name="password"
                  required={true}
                  type="password"
                  placeholder="Password"
                  style={inputFieldStyle}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="login__submit"
                  type="submit"
                  style={{
                    display: "block",
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: "16px",
                  }}
                >
                  Login
                </button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* <div className="login_form_page">
      <div className="login_form_box">

      </div>
    </div> */}
    </>
  );
};
