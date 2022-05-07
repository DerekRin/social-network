const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,

    addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "o user found with this userId" });
            return;
          }
          User.findOneAndUpdate(
            { _id: params.friendId },
            { $addToSet: { friends: params.userId } },
            { new: true, runValidators: true }
          )
            .then((dbUserData2) => {
              if (dbUserData2) {
                res
                  .status(404)
                  .json({ message: "No user found with this userId" });
                return;
              }
              res.json(dbUserData);
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    },

    deleteFriend({ params }, res) {
      User.findByIdAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this UserId" });
            return;
          }
          User.findOneAndUpdate(
            { _id: params.friendId },
            { $pull: { friends: params.userId } },
            { new: true, runValidators: true }
          )
            .then((dbUserData2) => {
              if (!dbUserData2) {
                res
                  .status(404)
                  .json({ message: "No user found with this UserId" });
                return;
              }
              res.json({ message: "Successfully removed User" });
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    },
  }
);

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
