import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';

const Form = () => {
  return (
    <>
      <h1>Create product</h1>
      <form>
        <TextField label='name' id='name' />
        <TextField label='size' id='size' />
        <InputLabel htmlFor='type'>Type</InputLabel>
        <NativeSelect
          value=''
          inputProps={{
            name: 'type',
            id: 'type',
          }}>
          <option value={'electronic'}>Electronic</option>
          <option value={'furniture'}>Furniture</option>
          <option value={'clothing'}>Clothing</option>
        </NativeSelect>
      </form>
    </>
  );
};

export default Form;
