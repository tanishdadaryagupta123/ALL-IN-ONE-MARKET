import React, { useEffect, useState } from 'react';
import "./Profile.scss";
import PageMenu from '../../components/pageMenu/PageMenu';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { getUser, updateUser } from '../../redux/features/auth/authSlice';


const Profile = () => {
    // Correctly extracting the user from Redux state first
    const { isLoading, user } = useSelector((state) => state.auth);

    // Initialize the state with the user data from Redux
    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        address: user?.address || "",
    };

    const [profile, setProfile] = useState(initialState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user == null){
        dispatch(getUser());
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user){
        setProfile({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            role: user?.role || "",
            address: user?.address || {},
        })
    }
    }, [dispatch, user]);

    const saveProfile = async () => {
        e.preventDefault()

        const userData ={
            name: profile.name,
            phone: profile.phone,
            address: {
                address: profile.address,
                state: profile.state,
                country: profile.country,
        }

    }
   await dispatch(updateUser(userData));
};

    const handleImageChange = () => {};

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
      };

    return (
        <section>
            <div className='container'>
                <PageMenu />
                <h4>Profile</h4>
                <div className='--flex-start profile'></div>
                <Card cardClass={"card"}>
                    {!isLoading && (
                        <>
                            <div className='profile-photo'>
                                <h2>Profile Image</h2>
                            </div>
                            <form onSubmit={saveProfile}>
                                <p>
                                    <label>Change Photo:</label>
                                    <input 
                                        type="file"
                                        accept='image/*'
                                        name="image"
                                        onChange={handleImageChange}

                                    />
                                </p>
                                <p>
                                    <label>Name:</label>
                                    <input 
                                        type="text"
                                        name="name"
                                        value={profile?.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>Email:</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={profile?.email}
                                        onChange={handleInputChange}
                                        required
                                        
                                    />
                                </p>
                                <p>
                                    <label>Phone:</label>
                                    <input 
                                        type="text"
                                        name="phone"
                                        value={profile?.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>Address:</label>
                                    <input 
                                        type="text"
                                        name="address"
                                        value={profile?.address}
                                        onChange={handleInputChange}
                                        required
                                      
                                    />
                                </p>
                                <p>
                                    <label>State:</label>
                                    <input 
                                        type="text"
                                        name="state"
                                        value={profile?.state}
                                        onChange={handleInputChange}
                                        required
                                      
                                    />
                                </p>
                                <p>
                                    <label>Country::</label>
                                    <input 
                                        type="text"
                                        name="county"
                                        value={profile?.country}
                                        onChange={handleInputChange}
                                        required
                                      
                                    />
                                </p>
                                <button className="--btn --btn-primary --btn-block">
                                    Update Profile
                                </button>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </section>
    );
}

export default Profile;
