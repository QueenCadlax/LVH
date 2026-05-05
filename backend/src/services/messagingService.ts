import pool from '../config/database';

export interface Message {
  id: number;
  sender_id: number;
  receiver_id?: number;
  business_id?: number;
  content: string;
  message_type: string;
  read: boolean;
  read_at?: Date;
  created_at: Date;
  sender_name?: string;
}

export interface Conversation {
  id: number;
  user_id: number;
  business_id?: number;
  other_user_id?: number;
  last_message?: string;
  last_message_at?: Date;
  unread_count: number;
}

class MessagingService {
  /**
   * Send a message
   */
  async sendMessage(
    senderId: number,
    content: string,
    businessId?: number,
    receiverId?: number
  ): Promise<Message> {
    const query = `
      INSERT INTO messages (sender_id, receiver_id, business_id, content, message_type)
      VALUES ($1, $2, $3, $4, 'text')
      RETURNING *;
    `;
    const result = await pool.query(query, [senderId, receiverId, businessId, content]);
    return result.rows[0];
  }

  /**
   * Get messages for a conversation
   */
  async getConversationMessages(
    userId: number,
    businessId?: number,
    otherUserId?: number,
    limit: number = 50
  ): Promise<Message[]> {
    let query = `
      SELECT m.*, u.name as sender_name
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      WHERE (m.sender_id = $1 OR m.receiver_id = $1)
    `;
    const params: any[] = [userId];

    if (businessId) {
      query += ` AND m.business_id = $2`;
      params.push(businessId);
    } else if (otherUserId) {
      query += ` AND ((m.sender_id = $2 AND m.receiver_id = $1) OR (m.sender_id = $1 AND m.receiver_id = $2))`;
      params.push(otherUserId);
    }

    query += ` ORDER BY m.created_at DESC LIMIT $${params.length + 1};`;
    params.push(limit);

    const result = await pool.query(query, params);
    return result.rows.reverse(); // Return in chronological order
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: number): Promise<void> {
    const query = `
      UPDATE messages
      SET read = true, read_at = NOW()
      WHERE id = $1;
    `;
    await pool.query(query, [messageId]);
  }

  /**
   * Mark all messages in conversation as read
   */
  async markConversationAsRead(userId: number, businessId?: number, otherUserId?: number): Promise<void> {
    let query = `
      UPDATE messages
      SET read = true, read_at = NOW()
      WHERE receiver_id = $1 AND read = false
    `;
    const params: any[] = [userId];

    if (businessId) {
      query += ` AND business_id = $2`;
      params.push(businessId);
    } else if (otherUserId) {
      query += ` AND sender_id = $2`;
      params.push(otherUserId);
    }

    await pool.query(query, params);
  }

  /**
   * Get user conversations
   */
  async getUserConversations(userId: number): Promise<Conversation[]> {
    const query = `
      SELECT 
        c.id,
        c.user_id,
        c.business_id,
        c.other_user_id,
        m.content as last_message,
        m.created_at as last_message_at,
        COUNT(CASE WHEN ms.read = false AND ms.receiver_id = $1 THEN 1 END) as unread_count
      FROM conversations c
      LEFT JOIN messages m ON c.last_message_id = m.id
      LEFT JOIN messages ms ON (ms.sender_id = c.other_user_id AND ms.receiver_id = $1 OR ms.business_id = c.business_id) AND ms.read = false
      WHERE c.user_id = $1 AND c.archived = false
      GROUP BY c.id, c.user_id, c.business_id, c.other_user_id, m.content, m.created_at
      ORDER BY c.last_message_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  /**
   * Get or create conversation
   */
  async getOrCreateConversation(
    userId: number,
    businessId?: number,
    otherUserId?: number
  ): Promise<Conversation> {
    let query = `
      SELECT * FROM conversations
      WHERE user_id = $1
    `;
    const params: any[] = [userId];

    if (businessId) {
      query += ` AND business_id = $2`;
      params.push(businessId);
    } else if (otherUserId) {
      query += ` AND other_user_id = $2`;
      params.push(otherUserId);
    }

    let result = await pool.query(query, params);

    if (result.rows.length === 0) {
      // Create new conversation
      const insertQuery = `
        INSERT INTO conversations (user_id, business_id, other_user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const insertParams: any[] = [userId];
      insertParams.push(businessId || null);
      insertParams.push(otherUserId || null);

      result = await pool.query(insertQuery, insertParams);
    }

    return result.rows[0];
  }

  /**
   * Get unread message count
   */
  async getUnreadCount(userId: number): Promise<number> {
    const query = `
      SELECT COUNT(*) as count
      FROM messages
      WHERE receiver_id = $1 AND read = false;
    `;
    const result = await pool.query(query, [userId]);
    return parseInt(result.rows[0].count);
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId: number, userId: number): Promise<boolean> {
    const query = `
      DELETE FROM messages
      WHERE id = $1 AND sender_id = $2;
    `;
    const result = await pool.query(query, [messageId, userId]);
    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Archive conversation
   */
  async archiveConversation(conversationId: number): Promise<void> {
    const query = `
      UPDATE conversations
      SET archived = true
      WHERE id = $1;
    `;
    await pool.query(query, [conversationId]);
  }
}

export default new MessagingService();
