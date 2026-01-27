import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';

export default function ButtonBasic() {
  return (
    <>
      <Button size="medium" variant='contained'>Yes</Button>
      <Button size="medium" variant='outlined'>No</Button>
      <textarea rows={4} cols={50} placeholder="Type here..."></textarea>
      <Checkbox /> I agree to the terms and conditions
    </>
  ) 
}