import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(
      "friends",
      "_id firstName lastName occupation location picturePath"
    );
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const [user, friend] = await Promise.all([
      User.findById(id),
      User.findById(friendId),
    ]);

    const isFriend = user.friends.includes(friendId);
    user.friends = isFriend
      ? user.friends.filter((f) => f !== friendId)
      : [...user.friends, friendId];
    friend.friends = isFriend
      ? friend.friends.filter((f) => f !== id)
      : [...friend.friends, id];

    await Promise.all([user.save(), friend.save()]);
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    res.status(200).json(
      friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        })
      )
    );
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
