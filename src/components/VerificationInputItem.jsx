import React, { useState, useEffect } from "react";
import styles from './SignUp.module.css';
import TokenManager from "../services/TokenManager";
import VerificationService from "@/services/VerificationService";

function VerificationInputItem({ createVerification }) {
  const [verification, setVerification] = useState({
    userId: "",
    verificationPhoto: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    fetchUserDetails();
    checkVerificationStatus();
  }, []);

  const fetchUserDetails = () => {
    const userId = TokenManager.getClaims()?.userId || "";
    setVerification((prevVerification) => ({ ...prevVerification, userId }));
  };

  const checkVerificationStatus = () => {
    const userId = TokenManager.getClaims()?.userId || "";
    VerificationService.hasUserSentVerification(userId)
      .then(response => {
        setVerificationStatus(response.verificationStatus);
      })
      .catch(error => {
        console.error('Error checking verification status:', error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setBase64Image(reader.result.split(',')[1]);
        setDisplayedImageUrl(`data:image/jpeg;base64,${reader.result.split(',')[1]}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const verificationWithImage = {
      ...verification,
      verificationPhoto: base64Image,
    };

    createVerification(verificationWithImage)
      .finally(() => {
        checkVerificationStatus();
      });

    setVerification({
      userId: "",
      verificationPhoto: null,
    });

    setImageFile(null);
    setBase64Image(null);
  };

  return (
    <nav className={styles.VerificationInputItem}>
      {verificationStatus === "PENDING" && (
        <p>Your verification request is pending. Please wait for processing.</p>
      )}

      {verificationStatus === "ACCEPTED" && (
        <p>Your verification request has been accepted. Congratulations!</p>
      )}

      {!verificationStatus && (
        <form className={styles["form-container"]} onSubmit={handleSubmit}>
          <h2>Create Verification</h2>

          <label className={styles["label-title"]}>Verification ID</label>

          <div>
            <label className={styles["label-title"]}>Verification Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {displayedImageUrl && (
              <img
                src={displayedImageUrl}
                alt="Preview"
                className={styles["input-photo"]}
              />
            )}
          </div>

          <button type="submit" className={styles["input-submit"]}>
            Submit
          </button>
        </form>
      )}
    </nav>
  );
}

export default VerificationInputItem;