import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import { saveProduct } from '../services/productService';
import { CREATED_STATUS } from '../constants/httpStatus';

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const getFormValues = ({ name, size, type }) => ({
    name: name.value,
    size: size.value,
    type: type.value,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { name, size, type } = e.target.elements;
    validateForm(getFormValues({ name, size, type }));
    const res = await saveProduct(getFormValues({ name, size, type }));
    if (res.status === CREATED_STATUS) {
      e.target.reset();
      setIsSuccess(true);
    }
    setIsSaving(false);
  };

  const blurHandler = (e) => {
    const { name, value } = e.target;
    validateFields({ name, value });
  };

  return (
    <>
      <h1>Create product</h1>
      {isSuccess && <p>Product Stored</p>}
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
