import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";
import TopRetedDetails from "../TopRetedDetails/TopRetedDetails";
import TopSinglePost from "../TopSinglePost/TopSinglePost";
import './TopPost.css';

const TopReact = () => {
  const {data: topPost = [], refetch} = useQuery({
    queryKey: ['topPosts'],
    queryFn: async() =>{
        const res = await fetch('http://localhost:5000/topPost');
        const data = await res.json();
        return data;
    }
  })
  return (
    <div className="top-post-section">
      <div className="container">
        <p className="text-center text-4xl font-semibold text-white mb-5">
          Top React Post
        </p>
        <div className="top-react-post">
          {topPost.map((post) => (
              <TopSinglePost key={post._id} post={post}></TopSinglePost>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopReact;
