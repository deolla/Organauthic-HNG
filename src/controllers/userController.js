import db from "../database/db.js";
import userSchema from '../schema/userSchema.js';

export const getUsers = async (req, res) => {
  try {
    const users = await db("users").select("*");
    res.status(200).json({
        status: 'success',
        message: 'Users fetched successfully',
        users,
    });
  } catch (err) {
    console.error(`Error fetching Users: ${err}`);
    res.status(500).json({
      status: 'error',
      message: "Error getting users",
      error: err.message,
    });
  }
};

export const getuserInfoById = async (req, res) => {
  const { id } = req.params;
  const requestingUserId = req.user.userId; // Assuming authentication sets req.user

  try {
    // Fetch user data from database using Knex.js
    const user = await db('users').where('userId', id).first();

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Authorization check
    if (user.userId !== requestingUserId) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to view this user record'
      });
    }

    await userSchema.validate(user);

    // Return user data
    res.json({
      status: 'success',
      message: 'User record retrieved successfully',
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user record'
    });
  }
};


// export const deleteUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//       const existingUser = await db('users').where('id', id).first();
//       if (!existingUser) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       if (existingUser.userId !== req.user.userId) {
//         return res.status(403).json({
//           message: 'You are not authorized to delete this user'
//         });
//       }

//       await db('users').where('id', id).delete();
//       return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//       console.error(`Error deleting User: ${err}`);
//       return res.status(500).json({
//           message: 'Error deleting user',
//           error: err.message
//       });
//   }
// };

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { firstName, lastName, email, password, phone } = req.body;

//   try {
//       const existingUser = await db('users').where('id', id).first();
//       if (!existingUser) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       if (existingUser.userId !== req.user.userId) {
//         return res.status(403).json({
//           message: 'You are not authorized to update this user'
//         });
//       }

//       // Prepare the update object with only defined properties
//       const updateObject = {};
//       if (firstName) updateObject.firstName = firstName;
//       if (lastName) updateObject.lastName = lastName;
//       if (email) updateObject.email = email;
//       if (password) updateObject.password = password;
//       if (phone) updateObject.phone = phone;

//       // Perform the update
//       await db('users').where('id', id).update(updateObject);

//       // Fetch and return the updated user
//       const updatedUser = await db('users').where('id', id).first();
//       return res.status(200).json(updatedUser);
//   } catch (err) {
//       console.error(`Error updating User: ${err}`);
//       return res.status(500).json({
//           message: 'Error updating user',
//           error: err.message
//       });
//   }
// };




