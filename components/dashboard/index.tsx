import React, { useState,memo } from "react";
import { Box } from "@mui/material";
import UserTableView from "./userTableView";
// import SearchBar from "../application/SearchBar";
// import PermanentDrawerLeft from "../drawerbar/drawerbar"

function DashboardComponent() {
  const [searchValueList, setSearchValueList] = useState<string[]>([""]);
  const [search, setSearch] = useState<string>("");
  return (
    <>
    <Box sx={{display: 'flex'}}>
    {/* <PermanentDrawerLeft /> */}
      {/* <SearchBar
        search={search}
        setSearch={setSearch}
        searchValueList={searchValueList}
        setSearchValueList={setSearchValueList}
      /> */}
      <Box padding={"30px"}>
        <UserTableView search={searchValueList[0]} />
      </Box>
      </Box>
    </>
  );
}

export default memo(DashboardComponent);
