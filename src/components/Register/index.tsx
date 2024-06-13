import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Register.css"
import fetcher from '../../helpers/fetcher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register: React.FC = () => {
  const [user, setUser] = useState<User>({
    id:'',
    firstName: "",
    lastName: "",
    maidenName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    birthDate: null,
    image: "",
    bloodGroup: "",
    height: "",
    weight: "",
    eyeColor: "",
    hair: {
      color: "",
      type: ""
    },
    address: {
      address: "",
      city: "",
      state: "",
      stateCode: "",
      postalCode: "",
      country: ""
    },
    university: "",
    bank: {
      cardExpire: "",
      cardNumber: "",
      cardType: "",
      currency: "",
      iban: ""
    },
    company: {
      department: "",
      name: "",
      title: ""
    },
    role: "user"
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value } as User);
  };

  const handleNestedChange = <T extends keyof User>(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    nestedKey: T
  ) => {
    const { name, value } = e.target;
    const nestedObject = user[nestedKey];
  
    if (typeof nestedObject === 'object' && nestedObject !== null) {
      setUser({
        ...user,
        [nestedKey]: {
          ...nestedObject,
          [name]: value
        }
      });
    }
  };
  


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetcher('users/add','POST',user)
    if(data.id){
      toast(`successfly registered as ${data.username}`);
    }
    // Here you would typically make the API call to post the user data
  };

  return (
    <form className='UserForm' onSubmit={handleSubmit}>
      <ToastContainer />
      <div className='Container'>
      <h3>Personal info</h3>
      <div className='Gridder'>

      <label>
        First Name:
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
      </label>
      <label>
        Maiden Name:
        <input type="text" name="maidenName" value={user.maidenName} onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={user.age} onChange={handleChange} required />
      </label>
      <label>
        Gender:
        <select name="gender" value={user.gender} onChange={handleChange} required>
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />
      </label>
      <label>
        Username:
        <input type="text" name="username" value={user.username} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={user.password} onChange={handleChange} required />
      </label>
      <label>
        Birth Date:
        <DatePicker
          selected={user.birthDate}
          onChange={(date: Date) => setUser({ ...user, birthDate: date })}
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          scrollableYearDropdown
          placeholderText="Select Birth Date"
          required
          />
      </label>
      <label>
        Image URL:
        <input type="text" name="image" value={user.image} onChange={handleChange} />
      </label>
      <label>
        Blood Group:
        <select name="bloodGroup" value={user.bloodGroup} onChange={handleChange}>
          <option value="" disabled>Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </label>
      <label>
        Height (cm):
        <input type="number" name="height" value={user.height} onChange={handleChange} />
      </label>
      <label>
        Weight (kg):
        <input type="number" name="weight" value={user.weight} onChange={handleChange} />
      </label>
      <label>
        Eye Color:
        <input type="text" name="eyeColor" value={user.eyeColor} onChange={handleChange} />
      </label>
      <label>
        Hair Color:
        <input type="text" name="color" value={user.hair.color} onChange={(e) => handleNestedChange(e, 'hair')} />
      </label>
      <label>
        Hair Type:
        <input type="text" name="type" value={user.hair.type} onChange={(e) => handleNestedChange(e, 'hair')} />
      </label>

          </div>
          </div>
    
      <div className='Container'>
      <h3>Address</h3>
      <div className='Gridder'>
      <label>
        Address:
        <input type="text" name="address" value={user.address.address} onChange={(e) => handleNestedChange(e, 'address')} required />
      </label>
      <label>
        City:
        <input type="text" name="city" value={user.address.city} onChange={(e) => handleNestedChange(e, 'address')} required />
      </label>
      <label>
        State:
        <input type="text" name="state" value={user.address.state} onChange={(e) => handleNestedChange(e, 'address')} required />
      </label>
      <label>
        State Code:
        <input type="text" name="stateCode" value={user.address.stateCode} onChange={(e) => handleNestedChange(e, 'address')} />
      </label>
      <label>
        Postal Code:
        <input type="text" name="postalCode" value={user.address.postalCode} onChange={(e) => handleNestedChange(e, 'address')} required />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={user.address.country} onChange={(e) => handleNestedChange(e, 'address')} required />
      </label>
      </div>
      </div>

      
      <div className='Container'>
      <h3>Company Information</h3>
      <div className='Gridder'>
      <label>
        Department:
        <input type="text" name="department" value={user.company.department} onChange={(e) => handleNestedChange(e, 'company')} />
      </label>
      <label>
        Company Name:
        <input type="text" name="name" value={user.company.name} onChange={(e) => handleNestedChange(e, 'company')} />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={user.company.title} onChange={(e) => handleNestedChange(e, 'company')} />
      </label>
      </div>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
