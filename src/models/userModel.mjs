import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;




// import db from "../db/conn.mjs"
// db.runCommand({
//         collMod: "users",
//         validator: {
//         $jsonSchema: {
//             bsonType: "object",
//             required: ["login", "password", "email"],
//             additionalProperties: false,
//             properties: {
//                 _id: {},
//                 login: {
//                     bsonType: "string",
//                     description: "'login' is required and is a string",
//                 },
                
//                 email: {
//                     bsonType: "string",
//                     description: "'email' is required and is one of 'junior', 'mid', or 'senior'",
//                     unique: true
//                 },
//                 password: {
//                     bsonType: "string",
//                     description: "'password' is required and is a string",
//                     minLength: 5
//                 },
//             }
//         }
//     }
// }) 