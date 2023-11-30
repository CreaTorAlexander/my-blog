import NotFoundPage from "./NotFoundPage";
import { useParams } from "react-router-dom";
import articles from "./article-content";

// Function Components
const ArticlePage = () => {
    const { articleId } = useParams()
    const article = articles.find( article => article.name === articleId);

    if(!article) {
        // no else, because after the return nothing else will get executed
        return <NotFoundPage />
    }

    return(
        // Syntax Helper, tell react we need to display more than just one 
        // Top Level Element
        <>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        </>
    )
}

export default ArticlePage;