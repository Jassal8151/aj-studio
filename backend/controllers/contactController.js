import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create a new contact inquiry
// @route   POST /api/contact
// @access  Public
export const createContactInquiry = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Notify admin via email when a new inquiry is submitted
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@ajstudio.com',
        subject: `New Inquiry from ${name}: ${subject}`,
        message: `You have received a new inquiry.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p>You have received a new inquiry.</p>
               <p><strong>Name:</strong> ${name}<br />
               <strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br />${message.replace(/\n/g, '<br />')}</p>`,
      });
    } catch (err) {
      console.error('Failed to send admin notification email', err);
    }

    res.status(201).json({ status: 'success', data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contact
// @access  Private (Admin)
export const getContactInquiries = async (req, res, next) => {
  try {
    const inquiries = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ status: 'success', data: inquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact inquiry status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
export const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Contact.findById(req.params.id);

    if (inquiry) {
      inquiry.status = status || inquiry.status;
      const updatedInquiry = await inquiry.save();
      res.json({ status: 'success', data: updatedInquiry });
    } else {
      res.status(404);
      throw new Error('Inquiry not found');
    }
  } catch (error) {
    next(error);
  }
};
