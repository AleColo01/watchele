-- ============================================
-- Watchio Database Setup SQL (AGGIORNATO)
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop old table if it exists (WARNING: deletes all data)
-- DROP TABLE IF EXISTS movies;

-- Create movies table with new fields
CREATE TABLE movies (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  
  -- Basic info
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('movie', 'series')),
  poster_url text,
  
  -- Individual ratings (1-10)
  voto_inizio integer CHECK (voto_inizio >= 1 AND voto_inizio <= 10),
  voto_fine integer CHECK (voto_fine >= 1 AND voto_fine <= 10),
  voto_tecnico integer CHECK (voto_tecnico >= 1 AND voto_tecnico <= 10),
  voto_sceneggiatura integer CHECK (voto_sceneggiatura >= 1 AND voto_sceneggiatura <= 10),
  voto_attori integer CHECK (voto_attori >= 1 AND voto_attori <= 10),
  
  -- Additional info
  personaggio_preferito text,
  risiguarderebbe boolean DEFAULT false,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster sorting by creation date
CREATE INDEX idx_movies_created_at ON movies(created_at DESC);

-- Create index for faster sorting by rating
CREATE INDEX idx_movies_rating ON movies((voto_inizio + voto_fine + voto_tecnico + voto_sceneggiatura + voto_attori) DESC);

-- Enable Row Level Security for security best practices
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Create policy allowing anonymous reads and inserts
CREATE POLICY "Allow anonymous access" ON movies
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- That's it! Your table is ready to use.
-- ============================================
