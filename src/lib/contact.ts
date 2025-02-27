import { supabase } from './supabase';
import { sendContactNotification } from './email';
import type { ContactMessage } from '../types/database';

// Submit a contact message to the database and send email notification
export const submitContactForm = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<ContactMessage> => {
  try {
    // First, insert the message into the database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message, read: false }])
      .select()
      .single();

    if (error) {
      console.error('Database error when submitting contact form:', error);
      throw new Error('Failed to save your message. Please try again later.');
    }

    // Then, send email notification
    try {
      await sendContactNotification(name, email, subject, message);
    } catch (emailError) {
      console.error('Email notification failed, but message was saved:', emailError);
      // We don't throw here because the message was saved in the database
      // This is a graceful degradation approach
    }

    return data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

// Get all contact messages (admin only)
export const getAllContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    throw new Error('Failed to load messages. Please try again.');
  }

  return data || [];
};

// Mark a message as read/unread
export const updateMessageReadStatus = async (id: string, read: boolean): Promise<void> => {
  const { error } = await supabase
    .from('contact_messages')
    .update({ read })
    .eq('id', id);

  if (error) {
    console.error('Error updating message status:', error);
    throw new Error('Failed to update message status. Please try again.');
  }
};

// Delete a contact message
export const deleteContactMessage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    throw new Error('Failed to delete message. Please try again.');
  }
};

// Get unread message count
export const getUnreadMessageCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('read', false);

  if (error) {
    console.error('Error counting unread messages:', error);
    throw new Error('Failed to count unread messages.');
  }

  return count || 0;
};