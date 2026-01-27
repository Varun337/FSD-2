import ButtonBasic from "./Button";
import TextFieldBasic from "./TextField";
import SelectBasic from "./Select";
export default function Home() {
  return <> 
    <h2>Home Page</h2>
    <div>
    Are you above 18 years of age?
    <SelectBasic />
    </div>
    <div style={{paddingTop:"20px"}}>
    Are you Sure:
    <ButtonBasic />
    </div>
    </>
  

}