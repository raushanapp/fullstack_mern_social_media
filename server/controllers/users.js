import User from "../models/user.js";

// Read

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message:error.message
        })
    }
}

export const getUserFriends = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
        );
        res.status(200).json({
            success: true,
            friends: formattedFriends
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

export const addRemoveFriend = async (req, res) => {
    const { id, friendId } = req.params;
    try {
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // checking if friends id  it having or not having or id if having then remove them
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
        );

        res.status(200).json({
            success: true,
            friends: formattedFriends
        }) 
    } catch (error) {
        res.status(404).json({
            success: false,
            message:error.message
        })
    }
}