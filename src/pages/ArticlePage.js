import { useState, useEffect }  from 'react';
import axios from 'axios';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from "./NotFoundPage";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import CommentsList from '../components/CommentsList';

// Function Components
const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []})
    
    
    // now it gets called whenever the articleId changes
    const { articleId } = useParams()
    useEffect(() => {
        // runs whenever the components gets updated /imported to notice
        const loadArticleInfo = async () => {
            const response = await axios.get(`http://localhost:4000/api/articles/${articleId}`)
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, []);

    const article = articles.find( article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`http://localhost:4000/api/articles/${articleId}/upvote`)
        const updatedArticle = response.data
        setArticleInfo(updatedArticle)
    }


    if(!article) {
        // no else, because after the return nothing else will get executed
        return <NotFoundPage />
    }

    return(
        // Syntax Helper, tell react we need to display more than just one 
        // Top Level Element
        <>
        <div className="upvotes-section">
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
            <button onClick={addUpvote}>Upvote</button>
        </div>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        <AddCommentForm
            articleName={articleId}
            onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} /> 
        <CommentsList comments={articleInfo.comments} />
        </>
    )
}

export default ArticlePage;