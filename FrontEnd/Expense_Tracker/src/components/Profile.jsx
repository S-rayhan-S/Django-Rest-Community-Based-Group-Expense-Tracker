import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/users/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        alert("You must be logged in to view this!");
        console.error(err.response?.data);
      }
    };

    fetchProfile();
  }, []);

  return profile ? (
    <div>
      <h2>Welcome, {profile.username}</h2>
      <p>Email: {profile.email}</p>
    </div>
  ) : (
    <p>Loading profile...</p>
  );
};

export default Profile;
