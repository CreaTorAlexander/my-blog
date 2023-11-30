import express from 'express';


// temporaray in memory dataabse
let articlesInfo = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments: [],
    },
    {
        name: 'learn-node',
        upvotes: 0,
        comments: [],
    },
    {
        name: 'mongodb',
        upvotes: 0,
        comments: [],
    }
]

const port = 4000;
const app = express();
app.use(express.json())

app.put('/api/articles/:name/upvote', (req, res) => {
    // Fake database, to keep track on how many upvotes
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);

    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!!`)
    } else {
        res.send('That article doesn\'t exist');
    }

})

app.post('/api/articles/:name/comments', (req, res) => {
    const { name } = req.params;
    const {postedBy, text} = req.body;

    const article = articlesInfo.find(a => a.name === name);

    // More Robust
    if(article){
        article.comments.push({ postedBy, text })
        res.send(article.comments)
    } else {
        res.send('That article doesn\'t exist')
    }

})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
