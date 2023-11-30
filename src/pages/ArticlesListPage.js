import articles from './article-content';
import ArticlesList from '../components/ArticlesList';
// Function Components
const ArticlesListPage = () => {
    return (
        // React Fragments, more then o ne TLE
        // Add key property always
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    )
}

export default ArticlesListPage;