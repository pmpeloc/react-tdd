import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const validateFields = ({ name, value }) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: value.length ? '' : `The ${name} is required`,
    }));
  };

  const validateForm = ({ name, size, type }) => {
    validateFields({ name: 'name', value: name });
    validateFields({ name: 'size', value: size });
    validateFields({ name: 'type', value: type });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { name, size, type } = e.target.elements;
    validateForm({ name: name.value, size: size.value, type: type.value });
    await fetch('/products', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    setIsSaving(false);
  };

  const blurHandler = (e) => {
    const { name, value } = e.target;
    validateFields({ name, value });
  };

  return (
    <>
      <h1>Create product</h1>
      <form onSubmit={submitHandler}>
        <TextField
          label='name'
          id='name'
          name='name'
          helperText={formErrors.name}
          onBlur={blurHandler}
        />
        <TextField
          label='size'
          id='size'
          name='size'
          helperText={formErrors.size}
          onBlur={blurHandler}
        />
        <InputLabel htmlFor='type'>Type</InputLabel>
        <NativeSelect
          value=''
          onBlur={blurHandler}
          inputProps={{
            name: 'type',
            id: 'type',
          }}>
          <option aria-label='None' value='' />
          <option value={'electronic'}>Electronic</option>
          <option value={'furniture'}>Furniture</option>
          <option value={'clothing'}>Clothing</option>
        </NativeSelect>
        {formErrors.type.length && <p>{formErrors.type}</p>}
        <Button type='submit' disabled={isSaving}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
