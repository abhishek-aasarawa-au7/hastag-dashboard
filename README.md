# [Hashtag Dashboard](https://hashtag-dashboard.herokuapp.com/)
---
A website where user can see hashtags and there current average length. The hashtags are ranked according to their average length

### Technologies Used:
##### 1. React-JS
##### 2. Material-UI
##### 3. Express-JS
##### 4. Heroku
##### 5. SocketIO
##### 6. Twitter APIs
##
##
### Routes:
#### 1. Main Routes:
        1. Home Route - "/"
        2. Map Route - "/map"
##
        
### Description:
Here to make a hashtag dashboard, there is need to following setup:
#### Twitter to Server Connection:
     For calculating average length, we need to fetch current tweet length. Twitter provide APIs for this. I used following API:
     Twitter.stream("statuses/filter", { track: hashtag })
     So by above API, a stream is established between twitter and server. And whenever there is a tweet include perticular hashtag, an "tweet" event is triggered by which server get current tweet.
#
#### Server to Frontend:
    Once server is getting tweet, it triggered an event which has name of that hashtag. And that event is listened on Frontend side. For this connection socket.io is used.
    
#### Displaying Data:
    On frontend side, average of length of tweets is calculated, once it get update of perticular hashtag. For calculating average maximum 50 tweets' length is stored as list. According to updated average length, rank of hashtag is changing. 
