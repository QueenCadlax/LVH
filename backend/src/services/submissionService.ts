import pool from '../config/database';
import { PendingSubmission, SubmissionFilters, SubmissionStats } from '../models/PendingSubmission';

export async function submitBusiness(submission: Omit<PendingSubmission, 'id' | 'submitted_at' | 'created_at' | 'updated_at'>): Promise<PendingSubmission> {
  const {
    business_name,
    category,
    sub_category,
    location,
    address,
    contact_email,
    contact_phone,
    description,
    operating_hours,
    services,
    amenities,
    menu_url,
    logo_url,
    images,
    videos,
    proof_of_business_url,
    facebook_url,
    instagram_url,
    twitter_url,
    tiktok_url,
    linkedin_url,
    youtube_url,
    website_url,
    selected_package,
    package_amount
  } = submission;

  const query = `
    INSERT INTO pending_submissions (
      business_name,
      category,
      sub_category,
      location,
      address,
      contact_email,
      contact_phone,
      description,
      operating_hours,
      services,
      amenities,
      menu_url,
      logo_url,
      images,
      videos,
      proof_of_business_url,
      facebook_url,
      instagram_url,
      twitter_url,
      tiktok_url,
      linkedin_url,
      youtube_url,
      website_url,
      selected_package,
      package_amount,
      status
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, 'pending'
    )
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [
      business_name,
      category,
      sub_category,
      location,
      address,
      contact_email,
      contact_phone,
      description,
      JSON.stringify(operating_hours),
      services,
      JSON.stringify(amenities),
      menu_url,
      logo_url,
      JSON.stringify(images),
      JSON.stringify(videos),
      proof_of_business_url,
      facebook_url,
      instagram_url,
      twitter_url,
      tiktok_url,
      linkedin_url,
      youtube_url,
      website_url,
      selected_package,
      package_amount
    ]);

    return result.rows[0];
  } catch (error) {
    console.error('Error submitting business:', error);
    throw error;
  }
}

export async function getPendingSubmissions(filters: SubmissionFilters = {}): Promise<{ submissions: PendingSubmission[], total: number }> {
  const { status = 'pending', category, location, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM pending_submissions WHERE 1=1';
  const params: any[] = [];
  let paramCount = 0;

  if (status) {
    paramCount++;
    query += ` AND status = $${paramCount}`;
    params.push(status);
  }

  if (category) {
    paramCount++;
    query += ` AND category = $${paramCount}`;
    params.push(category);
  }

  if (location) {
    paramCount++;
    query += ` AND location = $${paramCount}`;
    params.push(location);
  }

  query += ' ORDER BY submitted_at DESC';

  // Get total count
  const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
  const countResult = await pool.query(countQuery, params);
  const total = parseInt(countResult.rows[0]?.count || '0', 10);

  // Get paginated results
  paramCount++;
  query += ` LIMIT $${paramCount}`;
  params.push(limit);
  paramCount++;
  query += ` OFFSET $${paramCount}`;
  params.push(offset);

  try {
    const result = await pool.query(query, params);
    return {
      submissions: result.rows.map(row => ({
        ...row,
        operating_hours: typeof row.operating_hours === 'string' ? JSON.parse(row.operating_hours) : row.operating_hours,
        amenities: typeof row.amenities === 'string' ? JSON.parse(row.amenities) : row.amenities,
        images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
        videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : row.videos
      })),
      total
    };
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    throw error;
  }
}

export async function getSubmissionById(id: number): Promise<PendingSubmission | null> {
  const query = 'SELECT * FROM pending_submissions WHERE id = $1';

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      ...row,
      operating_hours: typeof row.operating_hours === 'string' ? JSON.parse(row.operating_hours) : row.operating_hours,
      amenities: typeof row.amenities === 'string' ? JSON.parse(row.amenities) : row.amenities,
      images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images,
      videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : row.videos
    };
  } catch (error) {
    console.error('Error fetching submission:', error);
    throw error;
  }
}

export async function approveSubmission(submissionId: number, adminId: number): Promise<PendingSubmission> {
  const submission = await getSubmissionById(submissionId);
  if (!submission) throw new Error('Submission not found');

  const query = `
    UPDATE pending_submissions
    SET status = 'approved', approved_by = $1, approved_at = NOW(), updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [adminId, submissionId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error approving submission:', error);
    throw error;
  }
}

export async function rejectSubmission(submissionId: number, rejectionReason: string): Promise<PendingSubmission> {
  const query = `
    UPDATE pending_submissions
    SET status = 'rejected', rejection_reason = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [rejectionReason, submissionId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error rejecting submission:', error);
    throw error;
  }
}

export async function getSubmissionStats(): Promise<SubmissionStats> {
  const query = `
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
      COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
      COALESCE(SUM(CASE WHEN status = 'pending' THEN package_amount ELSE 0 END), 0) as revenue_expected
    FROM pending_submissions;
  `;

  try {
    const result = await pool.query(query);
    const row = result.rows[0];
    return {
      total: parseInt(row.total || '0', 10),
      pending: parseInt(row.pending || '0', 10),
      approved: parseInt(row.approved || '0', 10),
      rejected: parseInt(row.rejected || '0', 10),
      revenueExpected: parseFloat(row.revenue_expected || '0')
    };
  } catch (error) {
    console.error('Error fetching submission stats:', error);
    throw error;
  }
}

export async function moveApprovedToBusiness(submissionId: number): Promise<void> {
  const submission = await getSubmissionById(submissionId);
  if (!submission) throw new Error('Submission not found');
  if (submission.status !== 'approved') throw new Error('Submission must be approved first');

  const businessQuery = `
    INSERT INTO businesses (
      name,
      category,
      description,
      phone,
      email,
      location,
      images,
      videos,
      services,
      amenities,
      hours,
      tier,
      status,
      created_at,
      updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'active', NOW(), NOW())
    RETURNING id;
  `;

  try {
    // Map submission to business
    const tier = submission.selected_package === 'platinum' ? 'platinum' : 
                 submission.selected_package === 'professional' ? 'elite' : 'premium';

    await pool.query(businessQuery, [
      submission.business_name,
      submission.category,
      submission.description,
      submission.contact_phone,
      submission.contact_email,
      submission.location,
      JSON.stringify(submission.images),
      JSON.stringify(submission.videos),
      submission.services,
      JSON.stringify(submission.amenities),
      JSON.stringify(submission.operating_hours),
      tier
    ]);

    console.log('✅ Submission moved to businesses table');
  } catch (error) {
    console.error('Error moving submission to businesses:', error);
    throw error;
  }
}
