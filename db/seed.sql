DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS main CASCADE;
DROP TABLE IF EXISTS actions CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS sleep_records CASCADE;

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL,
    first_login timestamp,
    topics VARCHAR
    -- topics by users should be a separate table, would need to do that to expand
);

CREATE TABLE main (
    user_id INTEGER REFERENCES users,
    topic_name VARCHAR,
    event_time timestamp,
    note VARCHAR
    -- Goals by users should be a table, I think. hardcoding the goals here so ignoring that.
    --Would be cleaner to put notes separate from events, but can filter the results pretty easily
);

CREATE TABLE comments (
    user_id integer REFERENCES users,
    topic_name VARCHAR,
    comment VARCHAR,
    comment_id SERIAL PRIMARY KEY,
    event_time timestamp
);

CREATE TABLE actions (
    user_id integer REFERENCES users,
    topic_name VARCHAR,
    event_type VARCHAR,
    event_time timestamp
);

CREATE TABLE sleep_records (
    user_id INTEGER REFERENCES users,
    day_of_year INTEGER,
    quality INTEGER
);

INSERT INTO users (email, password_digest, first_login, topics)
VALUES ('a', '$2a$10$08Pvn78i/PKh5rnQ7Vjdme/VzRhkYo0LYEqL9iDayCGPL./fIY1Uu', '2017-06-29 12:03:18.090258', 'insomnia');

INSERT INTO main (user_id, topic_name, event_time, note)
VALUES ('1', 'insomnia', '2017-06-29 12:03:18.090258', 'sdfasldfjasldkfjaslf');

INSERT INTO actions (user_id, topic_name, event_type, event_time)
VALUES
(1,'insomnia','exercise','2017-06-30 15:20:37.434853'),
(1,'insomnia','eating','2017-06-30 15:20:38.044905'),
(1,'insomnia','meditate','2017-06-30 15:20:38.757913'),
(1,'insomnia','meditate','2017-06-30 16:12:52.061913'),
(1,'insomnia','exercise','2017-06-30 16:12:52.938799'),
(1,'insomnia','eating','2017-06-30 16:12:53.579356'),
(1,'insomnia','exercise','2017-06-30 16:26:07.382627'),
(1,'insomnia','meditate','2017-06-30 16:26:09.136657'),
(1,'insomnia','exercise','2017-06-30 16:26:10.160489'),
(1,'insomnia','eating','2017-06-30 17:02:11.870952'),
(1,'insomnia','exercise','2017-06-30 17:02:13.667256'),
(1,'insomnia','meditate','2017-06-30 17:02:14.923779'),
(1,'insomnia','eating','2017-06-30 17:49:13.745807'),
(1,'insomnia','exercise','2017-06-30 17:49:14.770785'),
(1,'insomnia','meditate','2017-06-30 17:49:15.565833'),
(1,'insomnia','exercise','2017-06-30 17:49:17.100861'),
(1,'insomnia','eating','2017-06-30 17:49:18.159378'),
(1,'insomnia','meditate','2017-06-30 17:49:19.199986'),
(1,'insomnia','eating','2017-07-01 15:35:54.174345'),
(1,'insomnia','exercise','2017-07-01 15:35:54.84105'),
(1,'insomnia','meditate','2017-07-01 15:35:55.794377'),
(1,'insomnia','exercise','2017-07-01 15:35:56.604162'),
(1,'insomnia','eating','2017-07-01 15:35:57.328273'),
(1,'insomnia','exercise','2017-07-01 15:35:58.055778'),
(1,'insomnia','meditate','2017-07-01 15:35:58.726753'),
(1,'insomnia','exercise','2017-07-01 15:35:59.368373'),
(1,'insomnia','eating','2017-07-01 15:36:00.014717'),
(1,'insomnia','meditate','2017-07-01 19:28:20.950948'),
(1,'insomnia','eating','2017-07-01 19:42:58.990739'),
(1,'insomnia','exercise','2017-07-01 19:43:00.004333'),
(1,'insomnia','meditate','2017-07-01 22:46:05.224078'),
(1,'insomnia','meditate','2017-07-02 12:12:48.14613'),
(1,'insomnia','exercise','2017-07-02 12:19:57.798633'),
(1,'insomnia','eating','2017-07-02 14:49:21.037776'),
(1,'insomnia','eating','2017-07-02 15:25:32.194844'),
(1,'insomnia','eating','2017-07-03 08:16:28.946263'),
(1,'insomnia','exercise','2017-07-03 08:16:41.170097')
