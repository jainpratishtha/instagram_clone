1) set up
2) incorporate custome middleware
3) set up mongoDB ->create project ->build cluster ->network ->user ->connect
4) in keys.js store the uri
5) mongoose schema-->user.js
6) create authentication--> auth.js
7) create signup route 
8) hash the password using bcrypt
9) In collections you can see the added data
10) now create signin route
11) for user to use the services of the website the user must signed in, for this verification jsonwebtokens (jwt) are used (install from npm)
12) in keys.js jwt will be stored it cam be any random string.
13) now send token when ever the user signs in
14) create new folder middleware-> requireLogin.js
15) create a new mongoose schema for posts in models
16) create a new route for posts in routes
17) create a new route where only users posts are visible
18) now create front end using react.
19) to connect react app and node.js app we need to use cors package/ react proxy
20) start the react server on port 3000 and node server on 5000
21) to connet the react with node in client-> package.json ->below private add => "proxy": "http://localhost:5000",
22) This way, when you fetch('/api/todos') in development, the development server will recognize that it’s not a static asset, and will proxy your request to http://localhost:5000/api/todos as a fallback. The development server will only attempt to send requests without text/html in its Accept header to the proxy.
23) make reducers in cleint side.
