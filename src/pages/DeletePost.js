import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { URL } from "../App";

const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
  
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      ["link", "image"],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

const DeletePost = ({ }) => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        fetch(`${URL}/post/${id}`).then((response) => {
          response.json().then((postInfo) => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          });
        });
      }, []);

      async function deletePost(e) {
        e.preventDefault();

        

      const response = await axios.delete(`${URL}/post/${id}`, {
      method: "DELETE",
    //   body: data,
      credentials: 'include',
    });

    if (response.ok) {
        setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/"+id} />;
  }
  
  
    return (
        <form className="form-design" onSubmit={deletePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <input type="file" onChange={(e) => setFiles(e.target.files)} />

      <ReactQuill
        value={content}
        modules={modules}
        onChange={(newValue) => setContent(newValue)}
      />
      <button className="btn">Delete Post</button>
    </form>
    );
  };
  
  export default DeletePost;