import React, { useState, useEffect } from 'react';
import { 
  getAllTestimonials, 
  updateTestimonialStatus,
  deleteTestimonial
} from '../lib/supabase';
import { 
  getAllContactMessages,
  updateMessageReadStatus,
  deleteContactMessage,
  getUnreadMessageCount
} from '../lib/contact';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Mail, 
  Star, 
  MessageSquare, 
  User,
  Eye,
  EyeOff,
  Clock,
  Check,
  X,
  Trash2,
  AlertCircle,
  Filter,
  Search,
  RefreshCw,
  Bell
} from 'lucide-react';
import { signOut } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import type { ContactMessage, Testimonial } from '../types/database';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'testimonials' | 'messages'>('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Filters
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const [messageReadFilter, setMessageReadFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [testimonialSearchTerm, setTestimonialSearchTerm] = useState('');
  const [testimonialStatusFilter, setTestimonialStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (activeTab === 'testimonials') {
        const data = await getAllTestimonials();
        setTestimonials(data);
      } else {
        const data = await getAllContactMessages();
        setMessages(data);
        const count = await getUnreadMessageCount();
        setUnreadCount(count);
      }
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await loadData();
      setSuccess('Data refreshed successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      // Error is already handled in loadData
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTestimonialStatus = async (id: string, approved: boolean) => {
    try {
      await updateTestimonialStatus(id, approved);
      setTestimonials(prev =>
        prev.map(t => t.id === id ? { ...t, approved } : t)
      );
      setSuccess(`Testimonial ${approved ? 'approved' : 'unapproved'} successfully`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error updating testimonial status:', err);
      setError(err.message || 'Failed to update testimonial status');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setSuccess('Testimonial deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error deleting testimonial:', err);
      setError(err.message || 'Failed to delete testimonial');
    }
  };

  const handleMessageRead = async (id: string, read: boolean) => {
    try {
      await updateMessageReadStatus(id, read);
      setMessages(prev =>
        prev.map(m => m.id === id ? { ...m, read } : m)
      );
      if (!read) {
        setUnreadCount(prev => prev + 1);
      } else {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      setSuccess(`Message marked as ${read ? 'read' : 'unread'}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error updating message status:', err);
      setError(err.message || 'Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteContactMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      setSuccess('Message deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error deleting message:', err);
      setError(err.message || 'Failed to delete message');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to log out');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Filter functions
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(messageSearchTerm.toLowerCase());
    
    const matchesReadStatus = 
      messageReadFilter === 'all' || 
      (messageReadFilter === 'read' && message.read) || 
      (messageReadFilter === 'unread' && !message.read);
    
    return matchesSearch && matchesReadStatus;
  });

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(testimonialSearchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(testimonialSearchTerm.toLowerCase()) ||
      testimonial.message.toLowerCase().includes(testimonialSearchTerm.toLowerCase());
    
    const matchesStatus = 
      testimonialStatusFilter === 'all' || 
      (testimonialStatusFilter === 'approved' && testimonial.approved) || 
      (testimonialStatusFilter === 'pending' && !testimonial.approved);
    
    return matchesSearch && matchesStatus;
  });

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage testimonials and contact messages
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-8 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-start">
            <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === 'testimonials'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Star className="w-5 h-5 mr-2" />
              Testimonials
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                activeTab === 'messages'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        {activeTab === 'testimonials' ? (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Testimonials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="testimonialSearch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="testimonialSearch"
                    value={testimonialSearchTerm}
                    onChange={(e) => setTestimonialSearchTerm(e.target.value)}
                    placeholder="Search by name, role, or content"
                    className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTestimonialStatusFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      testimonialStatusFilter === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setTestimonialStatusFilter('approved')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      testimonialStatusFilter === 'approved'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setTestimonialStatusFilter('pending')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      testimonialStatusFilter === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Messages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="messageSearch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="messageSearch"
                    value={messageSearchTerm}
                    onChange={(e) => setMessageSearchTerm(e.target.value)}
                    placeholder="Search by name, email, subject, or content"
                    className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setMessageReadFilter('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      messageReadFilter === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setMessageReadFilter('read')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      messageReadFilter === 'read'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => setMessageReadFilter('unread')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center ${
                      messageReadFilter === 'unread'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === 'testimonials' ? (
          <div className="grid gap-6">
            {filteredTestimonials.length === 0 ? (
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <Star className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No testimonials found matching your filters.</p>
              </div>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {testimonial.image_data ? (
                        <img
                          src={testimonial.image_data}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://via.placeholder.com/48';
                          }}
                        />
                      ) : testimonial.display_picture ? (
                        <img
                          src={testimonial.display_picture}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://via.placeholder.com/48';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {testimonial.role}
                        </p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(testimonial.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTestimonialStatus(testimonial.id, true)}
                        className={`p-2 rounded-lg transition-colors ${
                          testimonial.approved
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400'
                        }`}
                        title="Approve testimonial"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleTestimonialStatus(testimonial.id, false)}
                        className={`p-2 rounded-lg transition-colors ${
                          !testimonial.approved
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400'
                        }`}
                        title="Reject testimonial"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      {!testimonial.approved && (
                        <button
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="p-2 rounded-lg transition-colors bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete testimonial"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {testimonial.message}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredMessages.length === 0 ? (
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <Mail className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No messages found matching your filters.</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${
                    !message.read ? 'border-l-4 border-blue-500 dark:border-blue-400' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {message.name}
                        </h3>
                        {!message.read && (
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {message.email}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMessageRead(message.id, !message.read)}
                        className={`p-2 rounded-lg transition-colors ${
                          message.read
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {message.read ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-2 rounded-lg transition-colors bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="mt-4 font-medium text-gray-900 dark:text-white">
                    {message.subject}
                  </h4>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {message.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;