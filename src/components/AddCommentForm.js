import { useState } from 'react';
import axios from 'axios';

// Pass the aguments down
const AddCommentForm = ( {articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText ] = useState('');
    /* Two Way Binding */

    const addComment = async ({  }) => {
        const response = await axios.post(`http://localhost:4000/api/articles/${articleName}/comments`, 
        {
            postedBy: name,
            text: commentText,
        })
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle)
        setName('')
        setCommentText('')
    }   
    /* Pretty Common Pattern in React */
    return(
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
            </label>
            <label>
                Comment:
                <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4" 
                    cols="50" />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;