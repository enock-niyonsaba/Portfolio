/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `subject` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamp with time zone)
      - `read` (boolean)
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for authenticated users to read all messages
    - Add policy for public to insert messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow public to insert messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);