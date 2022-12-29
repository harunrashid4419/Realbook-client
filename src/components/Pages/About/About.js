import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/UsersContext";
import "./About.css";

const About = () => {
  const { user } = useContext(AuthContext);
  const { data: singleUser = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const collage = event.target.collage.value;
    const address = event.target.address.value;

    savedDatabase(name, email, collage, address, event, refetch);
  };

  const savedDatabase = (name, email, collage, address, event, refetch) => {
    const users = { name, email, collage, address };
    fetch(`http://localhost:5000/users/${singleUser._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Update Successful");
          event.target.reset();
        }
      });
  };

  return (
    <div className="container">
      <div className="main-about">
        <div className="text-right mb-5">
          <label htmlFor="my-modal-3" className="btn btn-outline btn-error">
            Edit
          </label>
        </div>
        <div className="about-section">
          <h1 className="text-center text-4xl mb-5 font-semibold text-orange-500">
            About Yourself
          </h1>
          <input
            type="text"
            placeholder="Type here"
            value={singleUser?.name}
            className="input input-bordered input-primary w-full mb-5"
          />
          <input
            type="email"
            placeholder="Type here"
            value={singleUser?.email}
            className="input input-bordered input-primary w-full mb-5"
          />
          <input
            type="text"
            placeholder="Type here"
            value={singleUser?.collage}
            className="input input-bordered input-primary w-full mb-5"
          />
          <input
            type="text"
            placeholder="Type here"
            value={singleUser?.address}
            className="input input-bordered input-primary w-full mb-5"
          />

          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Edit your Profile</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Type Name"
                  value={singleUser?.name}
                  name="name"
                  className="input input-bordered input-accent w-full mt-3 mb-3"
                />
                <input
                  type="email"
                  placeholder="Type Email"
                  value={singleUser?.email}
                  name="email"
                  className="input input-bordered input-accent w-full mb-3"
                />
                <input
                  type="text"
                  placeholder="Type Collage"
                  name="collage"
                  className="input input-bordered input-accent w-full mb-3"
                />
                <input
                  type="text"
                  placeholder="Type Address"
                  name="address"
                  className="input input-bordered input-accent w-full mb-3"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-wide w-full mt-5"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
