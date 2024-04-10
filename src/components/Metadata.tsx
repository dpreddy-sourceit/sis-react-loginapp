import React, { useEffect, useState } from "react";
import getMetadata from "../services/metadata.service";
import { useDispatch } from "react-redux";
import { setMetadata } from "../store/app/appSlice";

const Metadata = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getMetadata();
        dispatch(setMetadata(details)); // Set productMetadata
        console.log("product Metadata", details);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);
  return <></>;
};

export default Metadata;
