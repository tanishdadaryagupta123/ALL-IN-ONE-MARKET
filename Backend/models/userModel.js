const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: String,
        required: true, // Fixed required value to true
        default: "customer",
        enum: ["customer", "admin"],
    },
    photo: {
        type: String,
        required: [true, "Please upload your image"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png", // Fixed default URL
    },
    phone: {
        type: String,
        default: "+234",
    },
    address: {
        type: Object,
    },
});

// Encrypt password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // Correctly use next() instead of return true
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to match user-entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
