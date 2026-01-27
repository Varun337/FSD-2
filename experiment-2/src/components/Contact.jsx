import { Checkbox } from "@mui/material";
import CheckboxBasic from "./Checkbox";
import Checkboxes from "./Checkbox";
import TextFieldBasic from "./TextField";

export default function Contact() {
  return(<>
  <h2>Contact Page</h2>
  <Checkboxes />
  <div style={{paddingTop:"20px", paddingBottom:"10px"}}>Enter Your Mobile Number: </div>
  <TextFieldBasic />
  </>)
}