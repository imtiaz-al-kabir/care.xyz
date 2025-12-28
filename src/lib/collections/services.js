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
    const services = await getServicesCollection();
    // Try finding by string ID first (legacy/slug)
    let service = await services.findOne({ id: id });

    // If not found and it looks like an ObjectId, try that
    if (!service && ObjectId.isValid(id)) {
        service = await services.findOne({ _id: new ObjectId(id) });
    }

    return service;
}

export async function upsertService(serviceData) {
    const services = await getServicesCollection();
    const { id, ...data } = serviceData;

    const result = await services.updateOne(
        { id: id },
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
    const services = await getServicesCollection();
    return await services.deleteOne({ id: id });
}
