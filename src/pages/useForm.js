import { useState } from 'react';

const useForm = (defaultValues = {}, handleValidation) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const handleChange = data => {
    const { name, value } = data;
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = handleValidation(values);
    setErrors(validationErrors);
    return validationErrors;
  }

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
