import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ProductTableComponent = ({ data }: { data: any }) => {
  console.log("productTableComponent", data);

  if (!data || data.length === 0) {
    // If data is empty or not available yet, render a loading message or return null
    return <div>Loading...</div>;
  }

  // Assuming mappedData is an array of objects with fieldName and data properties
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {data.map((field: any) => (
              <TableCell key={field.fieldName}>{field.fieldName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data[0].data.map((_undefined: undefined, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {data.map((field: any, columnIndex: number) => (
                <TableCell key={columnIndex}>{field.data[rowIndex]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTableComponent;
