const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    phoneNumber: { type: String },
    country: { type: String },
    company: { type: String },
    website: { type: String },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    plan: { type: String },
    planName: { type: String },
    customerId: { type: String },
    startPlan: { type: String },
    started: { type: Number },
    renew: { type: Number },
    paid: { type: Boolean, default: false },
    subscriptionId: { type: String },
    paymentMethodId: { type: String },
    tempPass: { type: Boolean, default: false },
    subscribe: { type: Boolean, default: true },
    tenderLocations: { type: Array, default: [] },
    tenderCategories: [{ type: Schema.Types.ObjectId, ref: "TenderCategory" }]

  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  console.log("passw: ", passw);
  console.log("this.password: ", this.password);
  bcrypt
    .compare(passw, this.password)
    .then((result) => {
      console.log("result vv: ", result);
      cb(null, result);
    })
    .catch((err) => {
      console.log("Err: ", err);
      return cb(err);
    });
};

module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);
