import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import ProductService from "../../services/product.service";
import ProductTableComponent from "./ProductTableComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FormatMetadata from "../../util/FormatMetadata";

// Define interface for metadata field
interface Field {
  fieldName: string;
  fieldLabel: string;
  ComponentTypeDescription: string;
  // Add other properties as needed
}

// Define interface for fetched data
interface FetchedData {
  [key: string]: string; // Adjust this based on actual data structure
}

// Function to map and create an object data based on metadata and fetched data
const mapData = (tableMetaData: Field[], fetchedData: FetchedData[]) => {
  const mappedData: any[] = [];

  // Iterate over each metadata item
  tableMetaData.forEach((metadataItem) => {
    const fieldName = metadataItem.fieldName;

    // Check if the field exists in the fetched data
    if (fieldName in fetchedData[0]) {
      const mappedField = {
        fieldName: metadataItem.fieldLabel,
        data: fetchedData.map((item) => item[fieldName]),
      };
      mappedData.push(mappedField);
    }
  });

  return mappedData;
};

const NavBar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch metadata from Redux store
  const metaData: any = useSelector((state: RootState) => state.app.metaData);
  console.log("MetaData: ", metaData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let fetchedData: FetchedData[] = [];
        let tableMetaData: Field[] = [];
        let mappedData: any[] = [];
        switch (selectedTab) {
          case 0:
            // Fetch data for Categories tab
            // fetchedData = await ProductService.getCategoriesData();
            break;
          case 1:
            // Fetch data for Global Trade Item Numbers tab
            // fetchedData = await ProductService.getGTINData();
            break;
          case 2:
            // Fetch data for Unit of Measure tab

            tableMetaData = FormatMetadata(metaData, "MD_PROD_UOM");
            fetchedData = await ProductService.getProductUomData();

            mappedData = mapData(tableMetaData, fetchedData);
            break;
          case 3:
            // Fetch data for Change History tab
            fetchedData = await ProductService.getProductHistoryData();
            break;
          // Add cases for other tabs as needed
          default:
            break;
        }

        setData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Categories" />
        <Tab label="Global Trade Item Numbers" />
        <Tab label="Unit of Measure" />
        <Tab label="Change History" />
        <Tab label="Taxes" />
        <Tab label="Attachments" />
      </Tabs>
      {loading ? <div>Loading...</div> : <ProductTableComponent data={data} />}
    </div>
  );
};

export default NavBar;
