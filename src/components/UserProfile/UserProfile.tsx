import React, { useEffect, useState } from "react";
import DisplayData from "./DisplayData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Import RootState from your Redux store file
import { mapUserData } from "../../util/UserProfileDataMapper";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { setUserProfile } from "../../store/app/appSlice";
import getProductDetailsGeneral from "../../services/product.service";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const userProfile: any = useSelector(
    (state: RootState) => state.app.userProfile
  );
  console.log("user profile", userProfile);
  const [mappedUserProfile, setMappedUserProfile] = useState<any>(null);
  const [rerenderKey, setRerenderKey] = useState<number>(0); // Dummy state variable for triggering rerender
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fire api to get the user profile data;
        // Save it to the Redux store
        let user = AuthService.getCurrentUser();
        const userDetails = await UserService.getUserDetails(
          user.email,
          "myprofile"
        );
        dispatch(setUserProfile(userDetails));
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, [dispatch]);
  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      console.log("In user profile");
      const mappedData = mapUserData(userProfile);
      setMappedUserProfile(mappedData);
    }
  }, [userProfile]);

  const handleSubmit = async (updatedUserData: any) => {
    // Update the user profile data in the Redux store or perform any necessary actions
    setMappedUserProfile(mapUserData(updatedUserData));

    setRerenderKey((prevKey) => prevKey + 1); // Increment the rerender
  };

  if (!mappedUserProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DisplayData
        data={mappedUserProfile}
        onSubmit={handleSubmit}
        key={rerenderKey} // Use the rerender key as the key prop to force rerender
      />
    </>
  );
};

export default UserProfile;
