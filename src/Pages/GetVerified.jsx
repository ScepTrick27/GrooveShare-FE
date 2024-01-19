import React, { useState, useEffect } from "react";
import VerificationService from "@/services/VerificationService";
import VerificationInputItem from "@/components/VerificationInputItem";
import styles from "./GetVerified.module.css";

const CreateVerification = () => {

const createVerification = (verification) => {
  console.log("Adding verification:", verification);

  VerificationService.createVerification(verification)
    .then(data => {
      console.log('Verification created:', data);
    })
    .catch(response => {
      const data = response.response.data;
    })
    .finally(() => {
      console.log('Verification Created!');
      window.location.href='/GetVerified'
    });
};
  
    return (
      <div className={styles.box}>
        <div className="inner">
          <VerificationInputItem createVerification={createVerification} />
        </div>
      </div>
    );
  };
  
  export default CreateVerification;