import { useState } from 'react';
import axios from 'axios';

const UploadThumbnail = ({ courseId }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !courseId) {
      console.error('Invalid image or courseId:', image, courseId);
      return;
    }
  
    setUploading(true);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('courseId', courseId);
  
    try {
      const response = await axios.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Upload response:', response);
  
      setUploadedUrl(response.data.url);
      onThumbnailUpload(response.data.url);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Thumbnail</button>
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        uploadedUrl ? (
          <p>
            Thumbnail uploaded successfully! <a href={uploadedUrl}>View image</a>
          </p>
        ) : (
          <p>No image uploaded yet.</p>
        )
      )}
    </div>
  );
};

export default UploadThumbnail;