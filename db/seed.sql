DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS main CASCADE;
DROP TABLE IF EXISTS action CASCADE;

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL,
    first_login timestamp,
    topics VARCHAR
    -- topics by users should be a separate table, would need to do that to expand
);

CREATE TABLE main (
    user_id integer REFERENCES users,
    topic_name VARCHAR,
    event_time timestamp,
    note VARCHAR
    -- goals by users should be separate, I think. hardcoding the goals here so ignoring that
    --would be cleaner to put notes separate from events, but can filter the results pretty easily
);

CREATE TABLE action (
    user_id integer REFERENCES users,
    topic_name VARCHAR,
    event_type VARCHAR,
    event_time timestamp
);
INSERT INTO users (email, password_digest, first_login, topics)
VALUES ('a', '$2a$10$08Pvn78i/PKh5rnQ7Vjdme/VzRhkYo0LYEqL9iDayCGPL./fIY1Uu', '2017-06-29 12:03:18.090258', 'insomnia');

INSERT INTO main (user_id, topic_name, event_time, note)
VALUES ('1', 'insomnia', '2017-06-29 12:03:18.090258', 'sdfasldfjasldkfjaslf');
