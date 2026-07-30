import axios from 'axios';

// Note: In a production app, direct upload from frontend requires an unsigned upload preset.
// You need to set this up in your Cloudinary Dashboard.
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // Replace these with your actual Cloudinary credentials from env
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';
  
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return {
      imageUrl: response.data.secure_url || response.data.url,
      publicId: response.data.public_id || response.data.publicId,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Image upload failed');
  }
};
