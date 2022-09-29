/* eslint-disable @next/next/no-img-element */

import { TableRow, Button, Alert} from '@mui/material'
import { map } from 'lodash'

import { TableRowDataProps } from '../../../backend/customTable/customTable'
import { getComparator, stableSort } from './helper'
import { BodyCell } from './style'
import axios from 'axios'
import * as React from 'react';


import CustomizedAccordions from './Accordion'


const TableRowData = ({ headCells, rows, order, orderBy, handleClick }: TableRowDataProps) => {
 
  
  const [success, Setsuccess] = React.useState<string>('')


  const HandlePasswordChange = async(formBody:any) => {
    
  

     

      

    
      let response = await axios.post('/api/passwordChange', formBody)
      console.log('reeeeee',response)
      if (response) {
        console.log('reeeeeett',response)
   

        Setsuccess("password updated Succesfully")
        // document.querySelector("#newPassword").value = null;
     
  
        // Setsuccess('password updated Succesfully')
  
      }
     
     
    
  }

  return (
    <>
      {map(stableSort(rows, getComparator(order, orderBy)), (row, index) => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={`${Object.keys(row)[0]}-${index}`}
          >
            {
              map(headCells, function (cell: any) {
                return <BodyCell key={cell.id} sx={{ fontSize: '17px',width:'80px'}}>
                  {cell.id == "email" ? 
                    <div>
                      <span style={{ color: "#35363E", fontWeight: "800", fontSize: "15px", fontFamily: "Steradian", fontStyle: "normal" }}>{row[cell.id].split(',')[1]} </span>

                      <br />
                      <span style={{ color: "#5F6068", fontWeight: "300", fontSize: "15px",top:"30px" ,fontFamily: "Steradian", fontStyle: "normal" }}>  {row[cell.id].split(',')[0]} </span>
                    </div>

                    : null
                  }
   {cell.id == "createdDateTime" ?
                    <div>
                      <span style={{ color: "#5F6068", fontWeight: "300", fontSize: "15px",top:"30px" ,fontFamily: "Steradian", fontStyle: "normal" }}>{new Date(row[cell.id]).toLocaleString()} </span>
                        </div>

                    : null
                  }


{cell.id == "password" ?  
<div>
<CustomizedAccordions prop = {row['email'].split(',')[0]} HandlePasswordChange = {HandlePasswordChange} />
</div>
// {/* { open ? <CustomizedAccordions />  :null} */}
                     
                        

                    : null
                  }
                  {
          success
            ? <Alert severity="success" sx={{
              position: 'absolute',
              right: '20px',
              bottom: '-1px'
            }} onClose={() => { Setsuccess('') }}>{success}</Alert>

            : null
        }
                  
                  

                  {/* {row[cell.id]} */}
                  {cell.id == "action" ?
                    <ButtonComponent email={row['email'].split(',')[0]} status={row['status']} handleClick={handleClick} />
                    : null
                  }

                </BodyCell>

              })
            }
            
          </TableRow>
          


        )
        
      })
      }



    </>
  )
}



const ButtonComponent = (userdata: any) => {
  

  const { email, status,handleClick } = userdata


   
  async function blockuser(email: any, status: any) {



  


    let formbody = {
      email,
      status
    }



    let response = await axios.post(`/api/blockUser`, formbody)

   
    if (response.status == 200) {
      handleClick(false)
  
    }
  }

  // let blockuseremail = props




  return (
    <>


<Button sx={{
                padding:'10px',
width: '87px',
height: '38px',
background: '#FFFFFF',
top:"12px",
border: '1px solid #FF6060',
borderRadius: '32px' }} onClick={(e) => blockuser(email, status)}><span style={{color:" #FF6060",fontSize: "13px"}}>{(status == 1) ? 'Block' : 'UnBlock'}</span></Button>
      {/* <Button type="submit" size="medium" sx={{
        display: 'block',
        margin: 'auto', color: 'black', border: '1px solid black'
      }} onClick={(e) => blockuser(email, status)}>{(status == 1) ? 'Block' : 'UnBlock'}</Button> */}


    </>
  )
}

export default TableRowData
