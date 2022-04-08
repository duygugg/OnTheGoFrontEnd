const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

// swagger

/** 
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: Arthur Dent
 *          description: the user name
 *        surname:
 *          type: string
 *          example: Dent
 *        email:
 *          type: string
 *          example: ArthurDent@gmail.com
 *        phone:
 *          type: string
 *          example: 904321232343
 *
 *      # Both properties are required
 *      required:
 *        - name
 *        - surname
 *        - email
 *        - phone
 */


/**
 * /api/users:
 * get: 
 *   summary: return all users
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref = '#/components/schemas/User
 *   responses: 
 *     200: 
 *       description: all users
 *       content: 
 *         application/json:
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/components/schemas/User'
 */

// create user instance
router.post('/users', (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then(data => res.json(data))
    .catch(error => res.json({message: error}));
});

//get all users
router.get('/users', (req, res) => {
  userSchema
    .find()
    .then(data => res.json(data))
    .catch(error => res.json({message: error}));
});

// get a user
router.get('/users/:id', (req, res) => {
  const {id} = req.params;
  userSchema
    .findById(id)
    .then(data => res.json(data))
    .catch(error => res.json({message: error}));
});

// delete a user
router.get('/users/:id', (req, res) => {
  const {id} = req.params;
  userSchema
    .remove({_id: id})
    .then(data => res.json(data))
    .catch(error => res.json({message: error}));
});

// update a user
router.get('/users/:id', (req, res) => {
  const {id} = req.params;
  const {name, surname, email, phone} = req.body;
  userSchema
    .update({_id: id}, {$set: {name, surname, email, phone}})
    .then(data => res.json(data))
    .catch(error => res.json({message: error}));
});

module.exports = router;
