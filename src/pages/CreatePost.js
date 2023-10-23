import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { URL } from '../App';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
['blockquote', 'code-block'],

[{ 'header': 1 }, { 'header': 2 }],               // custom button values
[{ 'list': 'ordered'}, { 'list': 'bullet' }],
[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
[{ 'direction': 'rtl' }],                         // text direction
['link', 'image'],
[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
[{ 'font': [] }],
[{ 'align': [] }],
['clean'] 
    ]
};

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
   async function creatNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();
        // console.log(files);
        const response = await fetch(`${URL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return(
        <form className="form-design" onSubmit={creatNewPost}>
            <input type="title" 
            placeholder={'Title'} 
            value={title} 
            onChange={e => setTitle(e.target.value)}/>

            <input type="summary" 
            placeholder={'Summary'}
            value={summary}
            onChange={e => setSummary(e.target.value)}/>

            <input type="file" 
            onChange={e => setFiles(e.target.files)}/>

            <ReactQuill 
            value={content} 
            modules={modules}
            onChange={newValue  => setContent(newValue)}/>
            <button className='btn'>Create Post</button>
        </form>
    );
};