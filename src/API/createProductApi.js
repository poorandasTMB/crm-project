import { toast } from "react-toastify";

const API_ENDPOINT = 'https://dummyjson.com/products/add';

export const createProductApi = (apidata) => {
  const formdata = new FormData();

  // Append data to FormData
  for (let key in apidata) {
    if (key === 'images' || key === 'thumbnail') {
      const files = apidata[key];
      if (Array.isArray(files)) {
        // If multiple files are allowed
        files.forEach((file, index) => {
          formdata.append(key, file);
        });
      } else {
        // If only one file is allowed
        formdata.append(key, apidata[key]);
      }
    } else {

    if (typeof apidata[key] === 'string' && apidata[key].startsWith('"') && apidata[key].endsWith('"')) {
        formdata.append(key, JSON.parse(apidata[key]));
      } else {
        formdata.append(key, apidata[key]);
      }
    }
  }

  return async (dispatch) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formdata,
      });

      // Check for success status
      if (response.ok) {
        const data = await response.json();
        toast.success("Product is Updated");
        
        return data;
      } else {
        // Handle non-JSON error response
        const errorText = await response.text();
        throw new Error(`Failed to update product. Server response: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
};
