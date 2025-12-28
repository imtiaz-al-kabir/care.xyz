import { ObjectId } from "mongodb";
import { getDB } from "@/lib/db";

const COLLECTION_NAME = "bookings";

export async function getBookingsCollection() {
    const db = await getDB();
    return db.collection(COLLECTION_NAME);
}

export async function createBooking(bookingData) {
    const bookings = await getBookingsCollection();

    const booking = {
        ...bookingData,
        status: bookingData.status || "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const result = await bookings.insertOne(booking);
    return { ...booking, _id: result.insertedId };
}

export async function getAllBookings() {
    const bookings = await getBookingsCollection();
    return await bookings.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getBookingById(id) {
    const bookings = await getBookingsCollection();
    return await bookings.findOne({ _id: new ObjectId(id) });
}

export async function updateBooking(id, updateData) {
    const bookings = await getBookingsCollection();

    const result = await bookings.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        },
        { returnDocument: "after" }
    );

    return result;
}

export async function deleteBooking(id) {
    const bookings = await getBookingsCollection();
    return await bookings.deleteOne({ _id: new ObjectId(id) });
}

export async function countBookings() {
    const bookings = await getBookingsCollection();
    return await bookings.countDocuments();
}
