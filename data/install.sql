CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255),
    wallet_type VARCHAR(255),
    total_amount FLOAT,
    created_at timestamptz
);

CREATE TABLE IF NOT EXISTS artworks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    image_width INT,
    image_height INT,
    description TEXT,
    token FLOAT,
    author VARCHAR(255),
    author_avatar VARCHAR(255),
    longitude FLOAT,
    latitude FLOAT,
    address VARCHAR(255),
    location VARCHAR(255),
    created_at timestamptz
);

-- CREATE TABLE IF NOT EXISTS wallet_rewards (
--     id SERIAL PRIMARY KEY,
--     user_id INT,
--     wallet_address VARCHAR(255),
--     total_amount INT,
--     created_at timestamptz
-- );

CREATE TABLE IF NOT EXISTS wallet_claim_artworks (
    id SERIAL PRIMARY KEY,
    user_id INT,
    artwork_id INT,
    wallet_address VARCHAR(255),
    visitor INT,
    total_visit INT,
    rewards FLOAT,
    created_at timestamptz
);
