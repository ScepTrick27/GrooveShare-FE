import React, { useState, useEffect } from "react";
import VerificationInputItem from "@/components/VerificationInputItem";
import VerificationService from "@/services/VerificationService";
import TokenManager from "@/services/TokenManager";
import styles from "./AllVerifications.module.css";

function VerificationListPage() {
  const [verifications, setVerifications] = useState([]);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const claims = TokenManager.getClaims();

  useEffect(() => {
    VerificationService.getAllVerifications()
      .then(response => {
        console.log('Verifications response:', response);
  
        const verificationsArray = response.verificationList || [];
  
        setVerifications(verificationsArray);
      })
      .catch(error => console.error('Error fetching verifications:', error));
  }, []);

  const handleUpdateVerification = async (id, verificationStatus) => {
    try {
      // Update the verification
      const verificationResponse = await VerificationService.updateVerification(id, { verificationStatus });
      console.log('Verification updated successfully:', verificationResponse);
  
      // Get the user ID from the selected verification
      const userId = selectedVerification.user.userId;
  
      // Verify the user
      const verifyUserResponse = await VerificationService.verifyUser(userId, { verificationStatus });
      console.log('User verified successfully:', verifyUserResponse);
  
      // Fetch updated verifications after the verification is updated and user is verified
     await VerificationService.getAllVerifications()
      .then(response => {
        console.log('Verifications response:', response);
  
        const verificationsArray = response.verificationList || [];
  
        setVerifications(verificationsArray);
        window.location.href='/AllVerifications'
      })
      .catch(error => console.error('Error fetching verifications:', error));
    } catch (error) {
      console.error('Error updating or verifying:', error);
    }
  };

  const handleVerificationClick = (verification) => {
    setSelectedVerification(verification);
  };

  return (
    <div className={styles.container}>
      <div className={styles.verificationList}>
        <h2>Verification List</h2>
        <ul  className={styles.verificationList}>
          {verifications.map((verification) => (
            <li
              key={verification.id}
              onClick={() => handleVerificationClick(verification)}
              className={styles.verificationItem}
            >
              <img
                src={`data:image/jpeg;base64,${verification.user.photo}`}
                alt="Preview"
                className={styles.smallCircleImg}
              />
              <div>
                <p>Username: <b>{verification.user.username}</b></p>
                <p>Description: <b>{verification.user.description}</b></p>
                {verification.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
  
      {selectedVerification && (
        <div className={styles.verificationDetails}>
          <h2>Verification Details</h2>
          <img
            src={`data:image/jpeg;base64,${selectedVerification.verificationPhoto}`}
            alt="Preview"
            className={styles.selectedVerification}
          />
          <div>
            <p>Username: <b>{selectedVerification.user.username}</b></p>
            <p>Description: <b>{selectedVerification.user.description}</b></p>
  
            {selectedVerification.status !== 'ACCEPTED' && selectedVerification.status !== 'DECLINED' && (
              <div className={styles.actions}>
                <button
                  onClick={() => handleUpdateVerification(selectedVerification.id, 'ACCEPTED')}
                  className={styles.accept}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateVerification(selectedVerification.id, 'DECLINED')}
                  className={styles.decline}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VerificationListPage;