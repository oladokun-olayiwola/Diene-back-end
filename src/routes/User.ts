import express from "express";

const router = express.Router()

import {getAllUsers, getSingleUser, updateUser, deleteUser} from '../controllers/User'

router.get('/', getAllUsers)
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser)

export default router