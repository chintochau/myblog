import React, { useState, useEffect } from "react";
import { submitComment } from "../../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      storeData: window.localStorage.getItem("storeData"),
    };

    setFormData(initialFormData);

    return () => {};
  }, []);

  const onInputChanged = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((state) => ({
        ...state,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [target.name]: target.value,
      }));
    }

  };

  const handleCommentSubmission = () => {
    setError(false);

    const { name, email, comment, storeData } = formData;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("storeData", storeData);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
      window.localStorage.removeItem("storeData", storeData);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          onChange={onInputChanged}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="comment"
          value={formData.comment}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          onChange={onInputChanged}
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
          value={formData.name}
        ></input>
        <input
          onChange={onInputChanged}
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
          value={formData.email}
        ></input>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            onChange={onInputChanged}
            type="checkbox"
            id="storeData"
            name="storeData"
            checked={formData.storeData}
          />
          <label
            className="text-gray-500 cursor-pointer mx-4"
            htmlFor="storeData"
          >
            Save my email and name for the next time I comment
          </label>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
