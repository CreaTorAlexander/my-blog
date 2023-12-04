import fs from 'fs';
import admin from 'firebase-admin';
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

// For firebase create private key
// reading the credentials private key
const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
})

const port = 4000;
const app = express();
// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json())
// another middleware
// verify that the authtoken is valid and load the corresponding user
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            res.sendStatus(400);
        }
    }
    // Execution goes on
    // call the next callback function

    req.user = req.user || {};

    next();
})

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name })

    // set correct header for json data
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article)
    } else {
        res.sendStatus(404).send('Article Not Found');
    }

})

// another middleware
// check if the user is logged in in the first place
// before procceding to the next endpoints
app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        // this status code indicates 
        // that the user is not allowed to access the ressource
        res.sendStatus(401);
    }
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    // Fake database, to keep track on how many upvotes
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name })

    // set correct header for json data
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if (canUpvote) {

            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid }
            })

        }
        const updatedArticle = await db.collection('articles').findOne({ name });



        res.json(updatedArticle)
    } else {
        res.send('That article doesn\'t exist');
    }
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: {
            comments: { postedBy: email, text },
        }
    })

    const article = await db.collection('articles').findOne({ name });
    // More Robust
    if (article) {
        res.json(article);
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
