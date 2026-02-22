import express from 'express';
import { getPortfolio, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController';

const router = express.Router();

router.get('/', getPortfolio);
router.get('/:id', getPortfolioById);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;
