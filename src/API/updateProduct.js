import { toast } from "react-toastify";

const API_ENDPOINT = 'https://dummyjson.com/products';

export const updateProductApi = (apidata) => {
  const { id, ...dataWithoutId } = apidata;
  let jsonString = JSON.stringify(dataWithoutId);

  return async (dispatch) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: jsonString
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Product is Updated");
        // You can return data or perform additional actions as needed
        return data;
      } else {
        // Handle error response
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
};
