import React from "react";
import "./SinglePost.css";
import { FaUserAlt } from "react-icons/fa";

const SinglePost = ({ post }) => {
  const { userName, email, message, img, photoURL } = post;
  return (
    <div className="main-user">
      <div className="user-section">
        {photoURL ? <img className="img-user" src={photoURL} alt="userImg" /> : <FaUserAlt className="user" />}
        <div className="md:pl-3 pl-1">
          <h2>{userName}</h2>
          <h5>{email}</h5>
        </div>
      </div>
      <p>{message}</p>
      <img className="message-img" src={img} alt="postImg" />
    </div>
  );
};

export default SinglePost;
