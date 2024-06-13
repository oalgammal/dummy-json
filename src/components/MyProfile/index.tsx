import React, { useContext, useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import { AuthContext } from '../../helpers/AuthProvider';
import './MyProfile.css'; // Import CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>({});
  const [editedValues, setEditedValues] = useState<{ [key: string]: string }>({});
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetcher('auth/me').then((userData: User) => {
        setUser(userData);
      });
    }
  }, [isLoggedIn]);

  const handleEditClick = (field: string) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [field]: true,
    }));
  };

  const handleSaveClick = async (field: string) => {
    console.log(`${field}: ${editedValues[field]}`);
    const body = JSON.stringify({
      [field]: editedValues[field]
    });
    
    const data = await fetcher(`users/${user?.id}`,'PUT',body)
    // setUser(data)
    setUser({...user , [field]: editedValues[field]})
    toast(`successfly edited as ${[field]} to ${editedValues[field]}`);
    const updatedEditableFields = { ...editableFields };
    updatedEditableFields[field] = false;
    setEditableFields(updatedEditableFields);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = event.target;
    setEditedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderField = (field: string, label: string, value: string | Hair | Address | Bank | Company) => {
    if (typeof value === 'object') {
      const nestedFields = Object.keys(value);
      return (
        <div key={field} className="field">
          <h3>{label}</h3>
          {nestedFields.map((nestedField) =>
            renderField(`${field}.${nestedField}`, nestedField, value[nestedField as keyof typeof value])
          )}
        </div>
      );
    } else {
      if (editableFields[field]) {
        return (
          <div key={field} className="field">
            <label>{label}:</label>
            <input
              type="text"
              value={editedValues[field] || ''}
              onChange={(e) => handleInputChange(e, field)}
            />
            <button className="saveButton" onClick={() => handleSaveClick(field)}>
              Save
            </button>
          </div>
        );
      } else {
        return (
          <div key={field} className="field">
            <label>{label}:</label>
            <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
            <button className="editButton" onClick={() => handleEditClick(field)}>
              Edit
            </button>
          </div>
        );
      }
    }
  };

  return (
    <>
    <h1>User Profile</h1>
    <ToastContainer />
    <div className="container">
      {Object.entries(user).map(([field, value]) => renderField(field, field, value))}
    </div>
    </>
  );
};

export default UserProfile;
