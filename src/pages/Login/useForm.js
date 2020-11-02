import { useState, useEffect } from 'react';

const useForm = (initialValues, callback, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCallback = async _ => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			return callback()
		}
	}

  useEffect(
		_ => {
			let isSubscribed = true
			handleCallback().then(_ => {
				if (isSubscribed && isSubmitting) {
					setIsSubmitting(false)
				}
			})
			return () => (isSubscribed = false)
		},
		[errors, isSubmitting]
	)

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default useForm;