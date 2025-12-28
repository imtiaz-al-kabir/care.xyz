import { getDB } from "@/lib/db";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "users";

export async function getUsersCollection() {
  const db = await getDB();
  return db.collection(COLLECTION_NAME);
}

export async function createUser(userData) {
  const users = await getUsersCollection();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = {
    name: userData.name,
    email: userData.email.toLowerCase().trim(),
    password: hashedPassword,
    contact: userData.contact || "",
    nid: userData.nid || "",
    role: userData.role || "user",
    isVerified: userData.isVerified || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await users.insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function findUserByEmail(email) {
  const users = await getUsersCollection();
  return await users.findOne({ email: email.toLowerCase().trim() });
}

export async function findUserById(id) {
  const users = await getUsersCollection();
  return await users.findOne({ _id: new ObjectId(id) });
}

export async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function getAllUsers() {
  const users = await getUsersCollection();
  return await users
    .find({}, { projection: { password: 0 } })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function countUsers() {
  const users = await getUsersCollection();
  return await users.countDocuments();
}
