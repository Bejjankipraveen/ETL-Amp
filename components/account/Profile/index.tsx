/* eslint-disable @next/next/no-img-element */
import React, { SyntheticEvent, useState, useEffect } from "react";
import { Input, Box, Grid, Button, Alert } from "@mui/material";
import PermanentDrawerLeft from "../../drawerbar/drawerbar";
import axios from "axios";

interface ProfileDataType {
  firstName: string;
  lastName: string;
  contactNo: string;
}

function ProfileComponent(user: any) {
  useEffect(() => {
    fetchdataUser();
  }, []);
  const [error, setError] = useState<string>("");
  const [success, Setsuccess] = useState<string>("");
  const [imagePath, setimagePath] = useState<string>("");
  const [emailUser, setEmailuser] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [data, setData] = useState<ProfileDataType>({
    firstName: "",
    lastName: "",
  
    contactNo: "",
  });

  async function fetchdataUser() {
    let email = user?.user?.email;

    let response = await axios.get(`/api/getUserByEmail?email=${email}`);

    let { firstName, lastName, contactNo } = response?.data?.userbyemail;

    setEmailuser(response?.data?.userbyemail?.email);
    setFirstname(firstName);
    setLastname(lastName);
    setPhonenumber(contactNo);
    setData({ firstName, lastName, contactNo });
  }

  const validateInput = (name: string, value: string) => {
    const trimmedValue = value.trim();
    switch (name) {
      // case 'imagePath':
      //   if (!trimmedValue.length) return 'Please enter your current password'
      //   break
      case "firstName":
        if (!trimmedValue.length) return "Please enter your firstname";
        break;
      case "lastname":
        if (!trimmedValue.length) return "Please enter your lastname";
        break;
      case "email":
        if (!trimmedValue.length) return "Please enter your email";
        break;
      case "phoneNo":
        if (!trimmedValue.length) return "Please  enter your contact no";
        break;
    }
    return null;
  };

  const validateForm = () => {
    const errors = {
      // imagePath: validateInput('imagePath',imagePath),
      firstName: validateInput("firstName", firstname),
      lastName: validateInput("lastname", lastname),
      email: validateInput("email", emailUser),
      phoneNo: validateInput("phoneNo", phonenumber),
    };
    const valid = Object.values(errors).filter((v) => !!v).length === 0;
    return { valid, errors };
  };

  const handleSubmit = async (formBody: any) => {
    if (
      data.firstName == formBody.firstName &&
      data.lastName == formBody.lastName &&
      data.contactNo == formBody.phoneNo
    ) {
      setError("values are not updated");
      return "values are not updated";
    }
    // Over here we have to handle the form submit

    let response = await axios.post("/api/updateUserProfile", formBody);
    if (response.data) {
      Setsuccess(response.data.message);
      let { firstName, lastName, contactNo } = formBody;

      setData({ firstName, lastName, contactNo });
    }
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const res = validateForm();
    if (!res.valid) {
    } else {
      const formBody: any = {
        // imagePath: imagePath,
        firstName: firstname,
        lastName: lastname,
        email: emailUser,
        phoneNo: phonenumber,
      };
      handleSubmit(formBody);
    }
  };

  const inputFieldStyle = {
    display: "block",
    width: "100%",
    margin: "30px auto",
  };

  return (
    <Grid container justifyContent="center" wrap="wrap" sx={{}}>
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
          {" "}
          <h1 style={{ fontWeight: "800px" }}>Profile</h1>
          <form
            method="POST"
            encType="multipart/form-data"
            style={{ marginLeft: "15rem", width: "54rem" }}
            onSubmit={handleFormSubmit}
          >
            <h1 style={{ color: "black", fontWeight: "300px" }}>
              Personal Info
            </h1>
            {/* <input type="file" name="file" id="file-input" onChange={(e) => setimagePath(e.target.value)} /> */}
            {/* {data.imagePath && <img src={data.imagePath} style={{ width: '100px', height: '100px', margin: ' 0 auto' }} alt="iamge" />} */}
            <div className="label_email" style={{ marginTop: "1.3rem" }}>
              <label style={{ marginTop: "24rem" }}>first Name</label>
            </div>
            <input
              className="login__input"
              id="firstName"
              name="firstName"
              required={true}
              value={firstname}
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
            {/* <Input id='firstName' name='firstName' required={true} value={firstname} type="text" placeholder='First Name'  onChange={(e) => setFirstname(e.target.value)} /> */}
            <div className="label_email" style={{ marginTop: "1.3rem" }}>
              <label style={{ marginTop: "24rem" }}>Last Name</label>
            </div>
            <input
              className="login__input"
              id="lastName"
              name="lastName"
              required={true}
              value={lastname}
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            />
            {/* <Input id='lastName' name='lastName' required={true} value={lastname} type="text" placeholder='Last Name'  onChange={(e) => setLastname(e.target.value)} /> */}
            <div className="label_email" style={{ marginTop: "1.3rem" }}>
              <label style={{ marginTop: "24rem" }}>Email Address </label>
            </div>
            <input
              className="login__input"
              id="email"
              name="email"
              disabled={true}
              value={emailUser}
              required={true}
              type="text"
              placeholder="Email"
            />
            {/* <Input id='email' name='email'  disabled = {true}  value={emailUser} required={true} type="text" placeholder='Email'  /> */}
            <div className="label_email" style={{ marginTop: "1.3rem" }}>
              <label style={{ marginTop: "24rem" }}> Contact No</label>
            </div>
            <input
              className="login__input"
              id="contactNo"
              name="contactNo"
              value={phonenumber}
              required={true}
              type="text"
              placeholder="Contact Number"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            {/* <Input id='contactNo' name='contactNo' value={phonenumber} required={true} type="text" placeholder='Contact Number'  onChange={(e) => setPhonenumber(e.target.value)} /> */}
            {/* {/* <Button type="submit" size="medium" sx={{ display: 'block', margin: 'auto', color: 'black' }} >Submit</Button> */}
            <button
              className="login__submit"
              type="submit"
              style={{
                fontFamily: "Steradian",
                display: "block",
                color: "#ffffff",
              }}
            >
              Save
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
  );
}

export default ProfileComponent;
