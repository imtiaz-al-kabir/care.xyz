import { getDB } from "@/lib/db";

const COLLECTION_NAME = "payments";

export async function getPaymentsCollection() {
  const db = await getDB();
  return db.collection(COLLECTION_NAME);
}

export async function createPayment(paymentData) {
  const payments = await getPaymentsCollection();

  const payment = {
    ...paymentData,
    status: paymentData.status || "pending",
    currency: paymentData.currency || "usd",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await payments.insertOne(payment);
  return { ...payment, _id: result.insertedId };
}

export async function getAllPayments() {
  const payments = await getPaymentsCollection();
  return await payments.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getPaymentBySessionId(sessionId) {
  const payments = await getPaymentsCollection();
  return await payments.findOne({ stripeSessionId: sessionId });
}

export async function updatePayment(filter, updateData) {
  const payments = await getPaymentsCollection();

  const result = await payments.findOneAndUpdate(
    filter,
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result;
}

export async function countPayments() {
  const payments = await getPaymentsCollection();
  return await payments.countDocuments();
}

export async function getSucceededPayments() {
  const payments = await getPaymentsCollection();
  return await payments.find({ status: "succeeded" }).toArray();
}
