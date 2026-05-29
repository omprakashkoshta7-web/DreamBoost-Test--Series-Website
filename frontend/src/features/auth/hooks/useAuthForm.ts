import { useState, useCallback } from 'react';

interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}

interface AuthFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export const useAuthForm = () => {
  const [values, setValues] = useState<AuthFormValues>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const handleChange = useCallback((field: keyof AuthFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: AuthFormErrors = {};
    if (!values.email) newErrors.email = 'Email is required';
    if (!values.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (onSubmit: (formValues: AuthFormValues) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) onSubmit(values);
    },
    [validate, values]
  );

  const resetForm = useCallback(() => {
    setValues({ name: '', email: '', password: '' });
    setErrors({});
  }, []);

  return { values, errors, handleChange, handleSubmit, resetForm };
};
