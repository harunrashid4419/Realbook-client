import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "./Detalis.css";
import { AuthContext } from "../../../context/UsersContext";
import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const location = useLocation();
  const id = location.pathname.split("/post/")[1];

  const { data: details = [], refetch: loading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      const data = await res.json();
      return data;
    },
  });
  const { photoURL, userName, email, img, message, react, _id } = details;
  const [click, setClick] = useState(false);
  const { user } = useContext(AuthContext);

  const { data: postComments = [], refetch } = useQuery({
    queryKey: ["comment", details],
    queryFn: async () => {
      const res = await fetch(
        `https://real-book-server.vercel.app/comment/${_id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleReact = (_id) => {
    const reactCount = { react };
    fetch(`http://localhost:5000/posts/${details._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reactCount),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          loading();
        }
      });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    addCommentToDB(comment, user, event, _id);
  };

  const addCommentToDB = (comment, user, event, _id) => {
    const comments = {
      comment,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      id: _id,
    };
    fetch("https://real-book-server.vercel.app/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comments),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          event.target.reset();
          refetch();
        }
      });
  };

  return (
    <div className="details-section">
      <div className="container">
        <div className="main-user">
          <div className="user-section">
            {photoURL ? (
              <img className="img-user" src={photoURL} alt="userImg" />
            ) : (
              <FaUserAlt className="user" />
            )}
            <div className="md:pl-3 pl-1">
              <h2>{userName}</h2>
              <h5>{email}</h5>
            </div>
          </div>
          <p>{message}</p>
          <img className="message-img" src={img} alt="postImg" />
          <div className="flex justify-between py-5 px-2">
            <h6 className="text-orange-600 font-bold text-xl">
              {react} People Love
            </h6>
            <div onClick={handleReact}>
              <span className="text-2xl" onClick={() => setClick(!click)}>
                {click ? (
                  <Link>
                    <BsHeartFill />
                  </Link>
                ) : (
                  <Link>
                    <BsHeart />
                  </Link>
                )}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-emerald-400 text-xl mb-2">Comment</h3>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="textarea textarea-success w-full"
                placeholder="Type your Comment"
                name="comment"
              ></textarea>
              <input
                type="submit"
                value="Submit Comment"
                className="btn btn-wide mt-3"
              />
            </form>
          </div>
          <div className="comment-section">
            {postComments.map((singleComment) => (
              <div className="flex mb-5">
                {singleComment?.photoURL ? (
                  <img
                    className="comment-img"
                    src={singleComment?.photoURL}
                    alt="userImg"
                  />
                ) : (
                  <FaUserAlt className="comment-user" />
                )}
                <div className="ml-5 p-3 rounded-xl border-2">
                  <h6 className="m-0">{singleComment?.name}</h6>
                  <span>{singleComment.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
