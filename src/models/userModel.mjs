import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//Notre schema utilisateur
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

// Comparaison des mots de passes pour voir si ils correspondent
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encryptage des MDP via Bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);//hashage du mot de passe.
});

const User = mongoose.model('User', userSchema);

export default User;
