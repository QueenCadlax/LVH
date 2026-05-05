import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import './MessagingUI.css';

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'file' | 'image';
  read: boolean;
  created_at: string;
  file_url?: string;
}

interface Conversation {
  id: string;
  conversation_id: string;
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  is_archived: boolean;
}

interface MessagingUIProps {
  userId: string;
  userName: string;
  userRole?: 'user' | 'business' | 'agent';
  onClose?: () => void;
}

const MessagingUI: React.FC<MessagingUIProps> = ({
  userId,
  userName,
  userRole = 'user',
  onClose,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations
  useEffect(() => {
    fetchConversations();
    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchConversations();
      fetchUnreadCount();
    }, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch messages when conversation selected
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      markAsRead(selectedConversation);
    }
  }, [selectedConversation]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/conversations');
      if (response.data.success) {
        setConversations(response.data.data);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    }
  };

  const fetchMessages = async (conversationId: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/messages/${conversationId}`);
      if (response.data.success) {
        setMessages(response.data.data);
        setError('');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/messages/unread/count');
      if (response.data.success) {
        setUnreadCount(response.data.data.unread_count);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  const markAsRead = async (conversationId: string) => {
    try {
      await api.post(`/messages/${conversationId}/read`);
      fetchConversations(); // Refresh to update unread counts
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) {
      return;
    }

    const messageContent = messageInput;
    setMessageInput('');

    try {
      const response = await api.post('/messages', {
        receiver_id: getSelectedRecipientId(),
        content: messageContent,
        message_type: 'text',
      });

      if (response.data.success) {
        // Add message to list optimistically
        const newMessage: Message = {
          id: response.data.data.id,
          sender_id: userId,
          sender_name: userName,
          receiver_id: getSelectedRecipientId(),
          content: messageContent,
          message_type: 'text',
          read: false,
          created_at: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
        fetchConversations(); // Refresh conversations
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      setMessageInput(messageContent); // Restore input on error
    }
  };

  const handleArchiveConversation = async () => {
    if (!selectedConversation) return;

    try {
      await api.post(`/messages/${selectedConversation}/archive`);
      fetchConversations();
      setSelectedConversation(null);
      setMessages([]);
    } catch (err) {
      console.error('Error archiving conversation:', err);
      setError('Failed to archive conversation');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await api.delete(`/messages/${messageId}`);
      setMessages(messages.filter(m => m.id !== messageId));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message');
    }
  };

  const getSelectedRecipientId = (): string => {
    const conv = conversations.find(c => c.conversation_id === selectedConversation);
    return conv?.participant_id || '';
  };

  const handleStartNewConversation = async () => {
    if (!newParticipant.trim()) return;
    // This would typically involve selecting from a user/business list
    // For MVP, we'll just clear the form
    setNewParticipant('');
    setShowNewConversation(false);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="messaging-ui">
      {/* Header */}
      <div className="messaging-header">
        <div className="header-left">
          <h2>Messages</h2>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
        {onClose && <button className="close-btn" onClick={onClose}>✕</button>}
      </div>

      <div className="messaging-container">
        {/* Conversations List */}
        <div className="conversations-list">
          <div className="conversations-toolbar">
            <button
              className="new-conversation-btn"
              onClick={() => setShowNewConversation(!showNewConversation)}
            >
              + New Message
            </button>
          </div>

          {showNewConversation && (
            <div className="new-conversation-form">
              <input
                type="text"
                placeholder="Enter name or email..."
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
              />
              <button onClick={handleStartNewConversation}>Start</button>
            </div>
          )}

          {conversations.length === 0 ? (
            <div className="no-conversations">No conversations yet</div>
          ) : (
            conversations
              .filter(c => !c.is_archived)
              .map((conversation) => (
                <div
                  key={conversation.conversation_id}
                  className={`conversation-item ${selectedConversation === conversation.conversation_id ? 'active' : ''}`}
                  onClick={() => setSelectedConversation(conversation.conversation_id)}
                >
                  <div className="conversation-avatar">
                    {conversation.participant_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="conversation-content">
                    <h3>{conversation.participant_name}</h3>
                    <p className="last-message">{conversation.last_message || 'No messages yet'}</p>
                  </div>
                  <div className="conversation-meta">
                    {conversation.unread_count > 0 && (
                      <span className="unread-badge">{conversation.unread_count}</span>
                    )}
                    <span className="timestamp">
                      {formatTime(conversation.last_message_time || new Date().toISOString())}
                    </span>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Messages View */}
        <div className="messages-view">
          {selectedConversation ? (
            <>
              {/* Message Thread Header */}
              <div className="thread-header">
                <div className="thread-info">
                  <h3>
                    {conversations.find(c => c.conversation_id === selectedConversation)
                      ?.participant_name || 'Message'}
                  </h3>
                </div>
                <button
                  className="archive-btn"
                  onClick={handleArchiveConversation}
                  title="Archive conversation"
                >
                  📁
                </button>
              </div>

              {/* Messages */}
              <div className="messages-content">
                {loading ? (
                  <div className="loading">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="no-messages">No messages in this conversation</div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${message.sender_id === userId ? 'sent' : 'received'}`}
                    >
                      <div className="message-header">
                        <span className="message-sender">{message.sender_name}</span>
                        <span className="message-time">
                          {formatTime(message.created_at)}
                        </span>
                      </div>
                      <div className="message-content">
                        {message.message_type === 'text' && <p>{message.content}</p>}
                        {message.message_type === 'file' && (
                          <a href={message.file_url} className="file-link" target="_blank" rel="noopener noreferrer">
                            📎 {message.content}
                          </a>
                        )}
                        {message.message_type === 'image' && (
                          <img src={message.file_url} alt="Attachment" className="message-image" />
                        )}
                      </div>
                      {message.sender_id === userId && (
                        <button
                          className="delete-msg-btn"
                          onClick={() => handleDeleteMessage(message.id)}
                          title="Delete message"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                {error && <div className="error-message">{error}</div>}
                <div className="input-form">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="send-btn"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="selection-placeholder">
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingUI;
