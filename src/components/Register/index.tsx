import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetcher from '../../helpers/fetcher';
import { User } from './types';

// Updated utility type for NestedKeys
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${K}` | `${K}.${NestedKeys<T[K]>}`
        : never;
    }[keyof T]
  : '';

export type UserField = NestedKeys<User>;

const Register: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<User>({
    defaultValues: {
      firstName: '',
      lastName: '',
      maidenName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      birthDate: null,
      image: '',
      bloodGroup: '',
      height: '',
      weight: '',
      eyeColor: '',
      hair: {
        color: '',
        type: ''
      },
      address: {
        address: '',
        city: '',
        state: '',
        stateCode: '',
        postalCode: '',
        country: ''
      },
      university: '',
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: ''
      },
      company: {
        department: '',
        name: '',
        title: ''
      },
      role: 'user'
    }
  });

  const onSubmit = async (data: User) => {
    try {
      const response = await fetcher('users/add', "POST", data);
      if (response.id) {
        toast.success(`Successfully registered as ${response.username}`);
      }
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  const renderTextInput = (name: UserField, label: string, required = false) => (
    <label key={name}>
      {label}:
      <input type="text" {...register(name as any, { required })} />
      {errors[name as keyof typeof errors] && <span>This field is required</span>}
    </label>
  );

  const renderNumberInput = (name: UserField, label: string, required = false) => (
    <label key={name}>
      {label}:
      <input type="number" {...register(name as any, { required })} />
      {errors[name as keyof typeof errors] && <span>This field is required</span>}
    </label>
  );

  const renderSelectInput = (name: UserField, label: string, options: string[], required = false) => (
    <label key={name}>
      {label}:
      <select {...register(name as any, { required })}>
        <option value="" disabled>Select {label}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {errors[name as keyof typeof errors] && <span>This field is required</span>}
    </label>
  );

  const renderNestedTextInput = (nestedKey: UserField, label: string) => (
    <label key={nestedKey}>
      {label}:
      <input type="text" {...register(nestedKey as any)} />
      {errors[nestedKey as keyof typeof errors] && <span>This field is required</span>}
    </label>
  );

  return (
    <form className='UserForm' onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className='Container'>
        <h3>Personal Info</h3>
        <div className='Gridder'>
          {renderTextInput('firstName', 'First Name', true)}
          {renderTextInput('lastName', 'Last Name', true)}
          {renderTextInput('maidenName', 'Maiden Name')}
          {renderNumberInput('age', 'Age', true)}
          {renderSelectInput('gender', 'Gender', ['Male', 'Female', 'Other'], true)}
          {renderTextInput('email', 'Email', true)}
          {renderTextInput('phone', 'Phone', true)}
          {renderTextInput('username', 'Username', true)}
          {renderTextInput('password', 'Password', true)}
          <label>
            Birth Date:
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  scrollableYearDropdown
                  placeholderText="Select Birth Date"
                  required
                />
              )}
            />
            {errors.birthDate && <span>This field is required</span>}
          </label>
          {renderTextInput('image', 'Image URL')}
          {renderSelectInput('bloodGroup', 'Blood Group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])}
          {renderNumberInput('height', 'Height (cm)')}
          {renderNumberInput('weight', 'Weight (kg)')}
          {renderTextInput('eyeColor', 'Eye Color')}
          {renderNestedTextInput('hair.color', 'Hair Color')}
          {renderNestedTextInput('hair.type', 'Hair Type')}
        </div>
      </div>

      <div className='Container'>
        <h3>Address</h3>
        <div className='Gridder'>
          {renderNestedTextInput('address.address', 'Address')}
          {renderNestedTextInput('address.city', 'City')}
          {renderNestedTextInput('address.state', 'State')}
          {renderNestedTextInput('address.stateCode', 'State Code')}
          {renderNestedTextInput('address.postalCode', 'Postal Code')}
          {renderNestedTextInput('address.country', 'Country')}
        </div>
      </div>

      <div className='Container'>
        <h3>Company Information</h3>
        <div className='Gridder'>
          {renderNestedTextInput('company.department', 'Department')}
          {renderNestedTextInput('company.name', 'Company Name')}
          {renderNestedTextInput('company.title', 'Title')}
        </div>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
