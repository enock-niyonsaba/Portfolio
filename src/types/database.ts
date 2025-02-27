export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  display_picture?: string;
  image_data?: string;
  created_at: string;
  approved: boolean;
}