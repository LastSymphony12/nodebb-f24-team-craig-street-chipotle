# Changes from NodeBB Project 2B

## Anonymous Backend Anonymous Variable
In src/topics/create.js - variable 'anonymous' is created on line 38. This flag will be triggered in the front end on button push whether a post is anonymous or not. This is represented as a boolean: true for anonymous and false for not. Our tests are sufficient because users can be flagged as anonymous and does not show any information that may link back to them.

When testing for this variable creation in the front end follow these steps:
1. Start NodeBB - ./nodebb start
2. Run the Redis Server - redis-server
3. Start the ./nodebb log
4. Go to the http://localhost:4567/
5. Create a new topic
6. See the log output has anonymous variable listed

## Search Topics Feature
1. Go to admin panel and login
2. Install nodebb-plugin-dbsearch plugin
3. Back to homepage, go to the general discussion forum/thread (or any thread/ forum)
4. To search for a specific topic, click on the search button near the Topic Tools option in the toolbar
5. In the search bar that shows up, type in the term that you want to search by and related results will appear

We added tests in the test/search.js, and you can run it with `npm run tests test/search.js`. The tests cover searching topics via keywords in titles. We believe our tests are sufficient because our tests return back the correct topics (determined by the search term). We created test topics and in our tests, the results of the search reflects that.
