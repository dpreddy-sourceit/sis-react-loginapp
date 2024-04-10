import * as changeCase from "change-case";

import store, { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface UserData{
    id: number;
    name: string;
    email: string;
    houseNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    language: string;
    timeZone: string;
    decimalFormat: string;
    dateFormat: string;
    timeFormat: string;
    password: string;
    gender: string;
    mobileNumber: number;
    officeNumber: number;
    roles: string[];
  }

interface MappedUserData {
    [key: string]: { key: string; value: string };
}

const mapUserData = (data: UserData): MappedUserData => {
    const mappedData: MappedUserData = {};
    
    // Loop through the properties of the user data object
    Object.entries(data).forEach(([key, value]) => {
       
      // Convert numeric values to strings
      console.log("in mapper", data)
      if(key != "password"){
      let formattedValue = value;
      if(key == 'roles'){
        formattedValue = value[0].name
      }
      // Capitalize the key and replace underscores with spaces
    const formattedKey = changeCase.capitalCase(key);
  
      // Assign the formatted key and value to the mapped data object
      mappedData[formattedKey] = { key, value: formattedValue };
      
    }});
  
    return mappedData;
  };


type ValueType = string | number | Record<string, any>;

interface SecMappedUserData {
    [key: string]: { key: string; value: ValueType };
}

interface RemappedData {
    [key: string]: ValueType | { id: number; name: string }[];
}


const remapUserData = (data: SecMappedUserData): RemappedData => {
    const remappedData: RemappedData = {};
    
    // Loop through the properties of the mapped user data object
    Object.entries(data).forEach(([mainKey, value]) => {
      if (!['Email', 'User Name'].includes(mainKey)){
        if (typeof value === 'object' && 'key' in value) {
            // If value is an object with 'key' and 'value' properties
            const { key, value: subValue } = value;
            if (key !== 'roles') { // Skip updating 'roles'
                
                remappedData[key] = subValue;
               
            }
        } else {
            // If value is directly a string, number, or array
            mainKey = changeCase.camelCase(mainKey);
            remappedData[mainKey] = value;
        }
}});
  
    return remappedData;
};



export { mapUserData, remapUserData };


