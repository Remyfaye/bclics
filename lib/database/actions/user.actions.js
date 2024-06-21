import User from "../models/user.model";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createUser = async ({ password, email }) => {
  try {
    console.log("here");
    await connectToDatabase();

    const newUser = await User.create({
      password: password,
      email: email,
    });

    console.log(newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export const getTheUser = async (userId) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteUser(_id) {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({ _id });

    if (!userToDelete) {
      throw new Error("user not found");
    }

    // await Promise.all([
    //     // Update the 'events' collection to remove references to the user
    //     Event.updateMany(
    //       { _id: { $in: userToDelete.events } },
    //       { $pull: { organizer: userToDelete._id } }
    //     ),

    //     // Update the 'orders' collection to remove references to the user
    //     Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    //   ])

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
