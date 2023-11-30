## From the LinkedIn learning tutorial
- https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site-15153869/setting-up-a-react-project?autoSkip=true&resume=false
### Main purpose 
- To learn more about React.
- Have a React boilerplate for new projects.
- Learning about Firebase Authentication.
- Hosting and Release, so far I only have experience with Heroku.

### Start with setting up React

### Important Commands
- npx create-react-app my-blog 
- npm run start 


### Good to Know
- jsx -> HTML like syntax that React uses to define interfaces


#### Learnings First Part
- React Router
- Modularity of components and how to reuse.

#### Learnings Second Part
- Shortcuts in package.json
- You can define in scripts section 
- ```"dev": "npx nodemon src/server.js",```

#### Learnings Part Three
- Set up a folder for our database
- mongod --dbpath ./mongo-db-data/       
- .pretty() at the end of find to print it out in a nicer way (in mongod)
- increment by 1 in mongodb ->  await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })
- $push add new object to an array

#### Learnings Part Four
- React Hooks as useState -> hooks run whenever the component gets updated
- Axios
- CORS Policy, Frontend and Backend on different ports, so we have to allow that they can talk to each other => Add a proxy in package.json to make them think they run on the same origin
- After proxy setup no need for the full url