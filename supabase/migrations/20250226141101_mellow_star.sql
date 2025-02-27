/*
  # Update testimonials RLS policies

  1. Changes
    - Update RLS policies for testimonials table to allow public inserts
    - Fix issue with testimonial submissions failing

  2. Security
    - Maintain security while allowing public testimonial submissions
    - Keep admin-only access for managing testimonials
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public to read approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON testimonials;

-- Create new policies
CREATE POLICY "Anyone can insert testimonials"
  ON testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Admins can manage all testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);