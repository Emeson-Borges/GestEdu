import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersConfig() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedUserData, setEditedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verifica se há um ID de usuário no localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Busca os dados do usuário com o ID obtido
        const response = await axios.get(`http://localhost:8000/api/users/${userId}/`);

        setUserData(response.data);
        setEditedUserData({ ...response.data });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/users/${userData.id}/`, editedUserData);
      setUserData({ ...editedUserData });
      console.log('User data updated successfully.');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userData.id}/`);
      setUserData(null);
      console.log('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>User Configuration</h2>
      {editedUserData && (
        <div>
          <input
            type="email"
            name="email"
            value={editedUserData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="first_name"
            value={editedUserData.first_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="last_name"
            value={editedUserData.last_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            value={editedUserData.password}
            onChange={handleInputChange}
            required
          />
        </div>
      )}
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default UsersConfig;
