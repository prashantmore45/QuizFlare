require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const emailToPromote = process.argv[2];

if (!emailToPromote) {
  console.log("Please provide an email. Example: node makeAdmin.js you@example.com");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOneAndUpdate({ email: emailToPromote }, { role: "admin" }, { returnDocument: 'after' });
    if (user) {
      console.log(`Successfully made ${user.email} an admin!`);
    } else {
      console.log(`User with email ${emailToPromote} not found.`);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
