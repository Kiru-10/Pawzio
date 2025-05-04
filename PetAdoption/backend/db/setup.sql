-- Mood calculation function
CREATE OR REPLACE FUNCTION calculate_mood(created_at TIMESTAMP WITH TIME ZONE) 
RETURNS TEXT AS $$
DECLARE
  days_in_system NUMERIC;
BEGIN
  days_in_system := EXTRACT(EPOCH FROM (NOW() - created_at)) / 86400;
  
  IF days_in_system < 1 THEN RETURN 'Happy';
  ELSIF days_in_system <= 3 THEN RETURN 'Excited';
  ELSE RETURN 'Sad';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Update trigger
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pets_timestamp
BEFORE UPDATE ON pets
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Indexes
CREATE INDEX IF NOT EXISTS pets_species_idx ON pets(species);
CREATE INDEX IF NOT EXISTS pets_adopted_idx ON pets(adopted);


-- Species table
CREATE TABLE IF NOT EXISTS species (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- Personality table
CREATE TABLE IF NOT EXISTS personalities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Pets table with foreign keys
CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species_id INTEGER NOT NULL REFERENCES species(id),
  age INTEGER NOT NULL CHECK (age >= 0),
  personality_id INTEGER NOT NULL REFERENCES personalities(id),
  adopted BOOLEAN DEFAULT FALSE,
  adoption_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- users table 
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,  
  regno VARCHAR(50) UNIQUE NOT NULL,  
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- contacts table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    message TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- adoptpet table
CREATE TABLE adoptpet (
  id SERIAL PRIMARY KEY,
  pet_id INTEGER NOT NULL REFERENCES pets(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  adoption_date TIMESTAMP NOT NULL DEFAULT NOW()
);

-- feedback table
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,              
  name VARCHAR(255) NOT NULL,          
  email VARCHAR(255) NOT NULL,         
  comment TEXT NOT NULL,               
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL, 
  visible BOOLEAN DEFAULT TRUE,       
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP   
);

