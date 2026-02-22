import { Response } from 'express';
import Portfolio, { IPortfolio } from '../models/Portfolio';
import { AuthRequest } from '../middleware/authMiddleware';

// Get all portfolio items
export const getPortfolio = async (req: AuthRequest, res: Response) => {
    try {
        const portfolio = await Portfolio.find().sort({ createdAt: -1 });
        res.json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single portfolio item
export const getPortfolioById = async (req: AuthRequest, res: Response) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }
        res.json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create portfolio item
export const createPortfolio = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, image, category, date, tags } = req.body;

        const portfolio = new Portfolio({
            title,
            description,
            image,
            category,
            date,
            tags: Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim())
        });

        const savedPortfolio = await portfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update portfolio item
export const updatePortfolio = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, image, category, date, tags } = req.body;

        const portfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                image,
                category,
                date,
                tags: Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim())
            },
            { new: true, runValidators: true }
        );

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        res.json(portfolio);
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete portfolio item
export const deletePortfolio = async (req: AuthRequest, res: Response) => {
    try {
        const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        res.json({ message: 'Portfolio item deleted successfully' });
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
