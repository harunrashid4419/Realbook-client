import React from "react";
import { Link } from "react-router-dom";
import "./TopSinglePost.css";

const TopSinglePost = ({ post }) => {
  const { message, img, _id } = post;
  return (
    <div>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body text-center p-5">
          <img
            id="top-react-img"
            src={img}
            alt="Shoes"
            className="rounded-xl w-full"
          />
          <p className="text-left py-3">
            {message.length > 80 ? message.slice(0, 80) : { message }}
          </p>
          <div className="card-actions">
            <Link to={`/details/${_id}`}>
              <button className="btn btn-primary">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSinglePost;
