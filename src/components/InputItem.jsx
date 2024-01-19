import React, { useState } from "react";
import styles from "./InputItem.module.css";

function InputItem({ addUser }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    description: "",
    userGender: "",
    photo: null, // Assuming the user object has a 'photo' property for the Base64-encoded image
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    description: "",
    userGender: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userWithImage = { ...user, photo: base64Image };

      // Pass userWithImage to the addUser function
      addUser(userWithImage);

      setUser({
        username: "",
        password: "",
        description: "",
        userGender: "",
        photo: null, // Clear the photo in the user state
      });

      setImageFile(null);
      setBase64Image(null);
      window.location.href = '/LogIn';
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      // Read the file as a Data URL (Base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setBase64Image(reader.result.split(',')[1]);
        setDisplayedImageUrl(`data:image/jpeg;base64,${reader.result.split(',')[1]}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const validateForm = () => {
    let formIsValid = true;

    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        validateField(key, user[key]);
        if (errors[key]) {
          formIsValid = false;
        }
      }
    }

    return formIsValid;
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "username":
        errorMessage = value.trim() === "" 
          ? "Username is required."          
          : value.length < 6
            ? "Username must be at least 6 characters."
            : "";
        break;
      case "password":
        errorMessage =
          value.trim() === ""
            ? "Password is required."
            : value.length < 6
              ? "Password must be at least 6 characters."
              : "";
        break;
      case "description":
        errorMessage = value.trim() === "" ? "Description is required." : "";
        break;
      case "userGender":
        errorMessage = value === "" ? "User Gender is required." : "";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [fieldName]: errorMessage });
  };

  return (
    <nav className={styles.InputItem}>
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <h2>Sign in</h2>

        <label className={styles["label-title"]}>Username</label>
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          pattern=".{6,}"
        />
        <div className={styles["error-message"]}>{errors.username}</div>

        <label className={styles["label-title"]}>Password</label>
        <input
          type="password"
          className={styles["input-text"]}
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          pattern=".{6,}"
          required
        />
        <div className={styles["error-message"]}>{errors.password}</div>

        <label className={styles["label-title"]}>Description</label>
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Description"
          name="description"
          value={user.description}
          onChange={handleInputChange}
        />
        <div className={styles["error-message"]}>{errors.description}</div>

        <div>
          <label className={styles["label-title"]}>Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {displayedImageUrl && (
            <img
              src={displayedImageUrl}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover my-4"
            />
          )}
        </div>
        
        <div className={styles["dropdown-container"]}>
          <label className={styles["label-title"]}>User Gender:</label>
          <select
            className={styles["user-gender-select"]}
            name="userGender"
            value={user.userGender}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </div>
        <div className={styles["error-message"]}>{errors.userGender}</div>
        <div>
          <button type="submit" className={styles["input-submit"]}>
            Submit
          </button>
        </div>
        
      </form>
    </nav>
  );
}

export default InputItem;