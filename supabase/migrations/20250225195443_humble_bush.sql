/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `role` (text, not null)
      - `message` (text, not null)
      - `rating` (integer, not null)
      - `display_picture` (text)
      - `created_at` (timestamp with time zone)
      - `approved` (boolean)
  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public to read approved testimonials
    - Add policy for public to insert testimonials
    - Add policy for authenticated users to manage testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  message text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  display_picture text,
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT false
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Allow public to insert testimonials"
  ON testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);