// "use server";

// import { handleError } from "@/lib/utils";
// import { connectToDatabase } from "..";
// import Event from "../models/event.model";

// import User from "../models/user.model";
// import Category from "../models/category.model";

// export const createEvent = async ({ event, userId, catId }) => {
//   try {
//     console.log(catId);
//     await connectToDatabase();

//     const organizer = await User.findById(userId);
//     const category = await Category.findById(catId);

//     const newEvent = await Event.create({
//       ...event,
//       category: JSON.parse(JSON.stringify(category)),
//       organizer: JSON.parse(JSON.stringify(organizer)),
//       //   category: event.categoryId,
//       //   organizer: userId,
//     });
//     // console.log(newEvent);
//     return JSON.parse(JSON.stringify(newEvent));
//   } catch (error) {
//     console.log(error);
//     handleError(error);
//   }
// };

// const populateEvent = (query) => {
//   return query
//     .populate({
//       path: "organizer",
//       model: "User",
//       select: "_id firstname lastname username email",
//     })
//     .populate({
//       path: "category",
//       model: "Category",
//       select: "_id name",
//     });
// };

// export const getAnEvent = async (eventId   ) => {
//   try {
//     await connectToDatabase();

//     const event = await populateEvent(Event.findById(eventId));

//     return JSON.parse(JSON.stringify(event));
//   } catch (error) {
//     handleError(error);
//   }
// };
// const getCategoryByName = async (name) => {
//   return Category.findOne({ name: { $regex: name, $options: "i" } });
// };

// export const getAllEvents = async ({ query, category }) => {
//   try {
//     console.log(query);
//     await connectToDatabase();

//     const titleCondition = query
//       ? { title: { $regex: query, $options: "i" } }
//       : {};

//     const categoryCondition = category
//       ? await getCategoryByName(category)
//       : null;
//     const conditions = {
//       $and: [
//         titleCondition,
//         categoryCondition ? { category: categoryCondition._id } : {},
//       ],
//     };

//     // const eventsQuery = Event.find(conditions)
//     // .sort({ createdAt: "desc" })
//     // // .skip(skipAmount)
//     // .limit(limit);
//     // let allEvents;

//     if (query) {
//       const allEventSearched = await populateEvent(Event.find(conditions));

//       // console.log("query");
//       return JSON.parse(JSON.stringify(allEventSearched));
//     }

//     const allEvents = await populateEvent(Event.find());
//     return JSON.parse(JSON.stringify(allEvents));

//     // console.log(allEvents);
//   } catch (error) {
//     handleError(error);
//   }
// };

// // export const getRelatedEvents = async (catId: string) => {
// //   try {
// //     await connectToDatabase();
// //     // const category = await Category.find({ name: catId })
// //     // const conditions = { category.name === catId };
// //     const relatedEvents = await populateEvent(Event.find({ category: catId }));
// //     console.log(relatedEvents);
// //     return JSON.parse(JSON.stringify(relatedEvents));
// //   } catch (error) {
// //     handleError(error);
// //   }
// // };

// export async function getRelatedEvents({
//   categoryId,
//   eventId,
// }) {
//   try {
//     await connectToDatabase();

//     const conditions = {
//       $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
//     };

//     const eventsQuery = Event.find(conditions).sort({ createdAt: "desc" });
//     const category = await Category.findById(categoryId);

//     const events = await populateEvent(Event.find(conditions));
//     const eventsCount = await Event.countDocuments(conditions);
//     // console.log(events);
//     return JSON.parse(JSON.stringify(events));
//   } catch (error) {
//     handleError(error);
//   }
// }
