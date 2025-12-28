import { ObjectId } from "mongodb";
import { getDB } from "@/lib/db";

const COLLECTION_NAME = "services";

export async function getServicesCollection() {
    const db = await getDB();
    return db.collection(COLLECTION_NAME);
}

export async function getAllServices() {
    const services = await getServicesCollection();
    return await services.find({}).toArray();
}

export async function getServiceById(id) {
    if (!ObjectId.isValid(id)) return null;
    const services = await getServicesCollection();
    return await services.findOne({ _id: new ObjectId(id) });
}

export async function upsertService(serviceData) {
    const services = await getServicesCollection();
    const { _id, ...data } = serviceData;

    const query = _id ? { _id: new ObjectId(_id) } : { title: data.title };

    const result = await services.updateOne(
        query,
        {
            $set: {
                ...data,
                updatedAt: new Date()
            },
            $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
    );

    return result;
}

export async function deleteService(id) {
    if (!ObjectId.isValid(id)) return null;
    const services = await getServicesCollection();
    return await services.deleteOne({ _id: new ObjectId(id) });
}
