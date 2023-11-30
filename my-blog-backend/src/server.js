import express from 'express';
import { db, connectToDb } from './db.js'

// temporaray in memory dataabse
// let articlesInfo = [
//     {
//         name: 'learn-react',
//         upvotes: 0,
//         comments: [],
//     },
//     {
//         name: 'learn-node',
//         upvotes: 0,
//         comments: [],
//     },
//     {
//         name: 'mongodb',
//         upvotes: 0,
//         comments: [],
//     }
// ]

const port = 4000;
const app = express();
app.use(express.json())

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    

    const article = await db.collection('articles').findOne({ name })

    // set correct header for json data
    if (article) {
        res.json(article)
    } else {
        res.sendStatus(404).send('Article Not Found');
    }

})

app.put('/api/articles/:name/upvote', async (req, res) => {
    // Fake database, to keep track on how many upvotes
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!!`)
    } else {
        res.send('That article doesn\'t exist');
    }
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;


    await db.collection('articles').updateOne({ name }, {
        $push: {
            comments: { postedBy, text },
        }
    })

    const article = await db.collection('articles').findOne( {name} );
    // More Robust
    if (article) {
        res.send(article.comments)
    } else {
        res.send('That article doesn\'t exist')
    }

})

connectToDb(() => {
    console.log("Successfully connected to DB")
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
})
