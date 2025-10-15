import axios from "axios";

export const updateSettings = async (formData) => {
  const filteredFormData = removeBlankAttributes({ ...formData });

  try {
    const updatedUser = await axios.patch(
      `${import.meta.env.VITE_DEV_API_BASE_URL}api/v1/users/updateMe`,
      filteredFormData,
      { withCredentials: true }
    );

    if (!updatedUser.status === 200) {
      throw new Error("failed to update settings. Please try again later");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Helper function to remove empty entries
function removeBlankAttributes(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== "" && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}
