import React, { useState, useEffect } from 'react';
import { Star, Quote, PlusCircle, X, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { getApprovedTestimonials, submitTestimonial } from '../lib/supabase';
import type { Testimonial } from '../types/database';
import ImageUploader from '../components/ImageUploader';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    message: '',
    rating: 5,
    display_picture: '',
    image_data: null as string | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getApprovedTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error('Error loading testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitTestimonial({
        name: newTestimonial.name,
        role: newTestimonial.role,
        message: newTestimonial.message,
        rating: newTestimonial.rating,
        image_data: newTestimonial.image_data
      });
      
      setSubmitSuccess(true);
      setNewTestimonial({
        name: '',
        role: '',
        message: '',
        rating: 5,
        display_picture: '',
        image_data: null
      });

      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Error submitting testimonial:', err);
      setError('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (imageData: string | null) => {
    setNewTestimonial(prev => ({
      ...prev,
      image_data: imageData
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Testimonials
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear what others have to say about working with me on various projects and initiatives.
          </p>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="mb-8 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Star className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">No testimonials available yet. Be the first to share your experience!</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  {testimonial.image_data ? (
                    <img
                      src={testimonial.image_data}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = ''; // Clear the src to prevent infinite error loops
                        // Replace with default user icon
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-500 dark:text-gray-400">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : testimonial.display_picture ? (
                    <img
                      src={testimonial.display_picture}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = ''; // Clear the src to prevent infinite error loops
                        // Replace with default user icon
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-500 dark:text-gray-400">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mb-2" />
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {testimonial.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Testimonial Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Add Testimonial
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Thank you for your testimonial!</p>
                    <p>Your testimonial has been submitted and is awaiting approval.</p>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={newTestimonial.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      value={newTestimonial.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profile Picture
                  </label>
                  <ImageUploader 
                    onImageUpload={handleImageUpload}
                    existingImage={newTestimonial.image_data}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={newTestimonial.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewTestimonial(prev => ({ ...prev, rating }))}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          rating <= newTestimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : submitSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Testimonial Submitted!
                      </>
                    ) : (
                      'Submit Testimonial'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;