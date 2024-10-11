# Changes from NodeBB Project 2B

## Anonymous Backend Anonymous Variable
In src/topics/create.js - variable 'anonymous' is created on line 38. This flag will be triggered in the front end on button push whether a post is anonymous or not. This is represented as a boolean: true for anonymous and false for not. 

When testing for this variable creation in the front end follow these steps:
1. Start NodeBB - ./nodebb start
2. Run the Redis Server - redis-server
3. Start the ./nodebb log
4. Go to the http://localhost:4567/
5. Create a new topic
6. See the log output has anonymous variable listed 