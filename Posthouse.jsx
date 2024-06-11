import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'; // For sending data to the backend
import "./Posthouse.css";

export default function Post() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showTick, setShowTick] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        ownerName: '',
        address: '',
        area: '',
        city: '',
        phoneNumber: '',
        whatsappNumber: '',
        googleMapLocation: '',
        pictures: [],
        videos: []
    });
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (type, files) => {
        setFormData({ ...formData, [type]: files });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("SUBMITTED");

        const pictureUrls = [];
        const videoUrls = [];

        try {
            const formDataToBackend = new FormData();

            // Append form data
            formDataToBackend.append('ownerName', formData.ownerName);
            formDataToBackend.append('address', formData.address);
            formDataToBackend.append('area', formData.area);
            formDataToBackend.append('city', formData.city);
            formDataToBackend.append('phoneNumber', formData.phoneNumber);
            formDataToBackend.append('whatsappNumber', formData.whatsappNumber);
            formDataToBackend.append('googleMapLocation', formData.googleMapLocation);

            // Append pictures and videos
            formData.pictures.forEach(picture => {
                formDataToBackend.append('pictures', picture);
            });

            formData.videos.forEach(video => {
                formDataToBackend.append('videos', video);
            });

            // Append marker position
            formDataToBackend.append('markerPosition', JSON.stringify({
                lat: marker.getLngLat().lat,
                lng: marker.getLngLat().lng
            }));

            // Send form data to the backend
            await axios.post('http://localhost:5000/api/houses', formDataToBackend);

            console.log('Form data and files stored successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error storing form data and files:', error);
        }
    };

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGs3MDI0MDkyIiwiYSI6ImNseGFsNmlsMzI2cDMyaXNjdGpvNTQ2dHgifQ.HhRzSO8Z0n2JNAfqXHB6zg';
        const newMap = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0],
            zoom: 1
        });
        const newMarker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([0, 0]).addTo(newMap);
        setMap(newMap);
        setMarker(newMarker);

        newMap.on('click', (e) => {
            newMarker.setLngLat(e.lngLat);
            setFormData({ ...formData, googleMapLocation: `${e.lngLat.lat}, ${e.lngLat.lng}` });
        });

        newMarker.on('dragend', () => {
            const lngLat = newMarker.getLngLat();
            setFormData({ ...formData, googleMapLocation: `${lngLat.lat}, ${lngLat.lng}` });
        });
    }, []);

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    const handleChange = (e) => {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
    };
  
    const handleUpload = () => {
      if (images.length === 0) return;
      setIsUploading(true);
      const totalImages = images.length;
      let totalBytesTransferred = 0;
      let totalBytes = images.reduce((acc, image) => acc + image.size, 0);
  
      const uploadTasks = images.map((image) => {
        const storageRef = ref(storage, `images/${image.name}`);
        return uploadBytesResumable(storageRef, image);
      });
  
      uploadTasks.forEach((uploadTask, index) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            totalBytesTransferred += snapshot.bytesTransferred - (snapshot.previousBytesTransferred || 0);
            const progressValue = Math.round((totalBytesTransferred / totalBytes) * 100);
            setOverallProgress(progressValue);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrls((prevUrls) => [...prevUrls, downloadURL]);
            
            // Reset images and file input after all uploads are complete
            if (index === totalImages - 1) {
              setImages([]);
              fileInputRef.current.value = null;
              setOverallProgress(0); // Reset progress bar
              setIsUploading(false); // Hide progress bar
              setShowTick(true); // Show tick animation
              setTimeout(() => setShowTick(false), 1000); // Hide tick animation after 1 second
              setVideoUrl(downloadURL); // Set video URL for playback
            }
          }
        );
      });
    };

    return (
        <>
            <div className="head">
                {user ? (
                    <div className="user-info">
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                )}
            </div>
            <div className="post">
                <h2>Post House Details</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Owner Name:
                            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleInputChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                        </label>
                        <label>
                            Area:
                            <input type="text" name="area" value={formData.area} onChange={handleInputChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                        </label>
                        <label>
                            Phone Number:
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                        </label>
                        <label>
                            WhatsApp Number:
                            <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div>
                        <div id="map" style={{ width: '100%', height: '400px' }}></div>
                    </div>
                    <div className="upload-container">
      <input
        type="file"
        multiple
        onChange={handleChange}
        ref={fileInputRef}
        className="file-input"
      />
      <button onClick={handleUpload} className="upload-button">Upload</button>
      {isUploading && (
        <div className="progress-container">
          <progress value={overallProgress} max="100" className="progress-bar" />
        </div>
      )}
      {showTick && (
        <div className="tick-container">
          <div className="tick">✔️</div>
        </div>
      )}
      {videoUrl && (
        <div className="video-container">
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="images-container">
        {urls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded file ${index}`} className="uploaded-image" />
        ))}
      </div>
    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
