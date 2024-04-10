interface Field {
    fieldName: string;
    fieldLabel: string;
    ComponentTypeDescription: string;
    // Add other properties as needed
}

function FormatMetadata(productMetadata: { [key: string]: any }[], id:string) {
  
    // Filter and sort fields
    const visibleFields = productMetadata.filter(field => field.Visibility === "1" && field.id === id);
    visibleFields.sort((a, b) => parseInt(a.SortSequence) - parseInt(b.SortSequence));
    
    const formFields: Field[] = visibleFields.map((field: { [key: string]: any }) => ({
        fieldName: field.fieldName,
        fieldLabel: field.fieldLabel,
        ComponentTypeDescription: field.ComponentTypeDescription,
        // Add other properties as needed
    }));
    
    // Example usage
    return formFields;
}

export default FormatMetadata;
