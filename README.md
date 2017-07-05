# express_project

The overall idea is to make something similar to fitocracy, except for mental health.
That’s a huge project, however.
In this case, the goal was to start with one topic (insomnia) and to learn how to track, store, and report user activities with three “test case” events.
Naturally, a huge amount of the work is in the background; I attempted to make the data structures as scalable as possible without actually building out new topic sections in the app.


basic wireframe profile page: https://wireframe.cc/I7r9FW

Technologies used
Node.js, Express, Mustache, Passport, etc
NPM packages
Moment.js for timestamp management
Chart.js for data visualizations
API
The initial goal was to pull sleep data collected by the user’s phone. However, the authentication procedure required manual support from the company, and they were unreachable due to the holidays.
As a workaround, I used Import.io, a DIY API maker, to set up a scraper that collects ”sleep data” and allows access to it via a REST-ful API

Features included

Activity logging: User can input their activities, which are stored server-side
Data visualization: User can see their activity over the past week, including their “sleep quality” (currently surrogate data)
Notes: User can save notes detailing different events or strategies that worked for them on different days
Forum: Users can communicate with other users in a comment section, filtered by topic.
Resources/FAQ page including short and long-term approaches to dealing with topic
