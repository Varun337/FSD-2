import { Select } from "@mui/material";
export default function SelectBasic() {
    return (
    <>
      <Select native defaultValue={"No"} >
        <option value={"Yes"}>Yes</option>
        <option value={"No"}>No</option>
        <option value={"Don't know"}>Don't know</option>
      </Select>
    </>
  )
}