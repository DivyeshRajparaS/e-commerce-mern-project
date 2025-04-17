import { Router } from "express";
import { deleteReview, getAllReviews, showLatestReviews, updateReview, writeReview } from "../controllers/reviewController.js";
import { verifyJWT } from "../middleware/userAuth.js";

const router = Router();

router.route('/getLatestReviews/:productId').post(showLatestReviews);
router.route('/writeReview/:productId').post(verifyJWT, writeReview);
router.route('/getAllReviews/:productId').post(verifyJWT, getAllReviews);
router.route('/updateReview').post(verifyJWT, updateReview);
router.route('/deleteReview').post(verifyJWT, deleteReview);

export default router;