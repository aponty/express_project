DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL,
    first_login timestamp,
    topics VARCHAR
    -- topics by users should be a separate table, would need to do that to expand
);

DROP TABLE IF EXISTS main CASCADE;

CREATE TABLE main (
    user_id integer REFERENCES users,
    topic_name VARCHAR UNIQUE,
    action VARCHAR,
    goal VARCHAR,
    event_time timestamp
);
