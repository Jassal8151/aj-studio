import Portfolio from '../models/Portfolio.js';

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
export const getPortfolioItems = async (req, res, next) => {
  try {
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    res.json({ status: 'success', data: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new portfolio item
// @route   POST /api/portfolio
// @access  Private (Admin)
export const createPortfolioItem = async (req, res, next) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private (Admin)
export const updatePortfolioItem = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin)
export const deletePortfolioItem = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json({ status: 'success', message: 'Item removed' });
  } catch (error) {
    next(error);
  }
};
