import { db } from '../firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
const eventsCollectionRef = collection(db, 'events');

export const apiGetAllEvents = async () => {
  const data = await getDocs(eventsCollectionRef);
  const eventsArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return eventsArray;
};

export const apiAddNewEvent = async (eventData) => {
  return await addDoc(eventsCollectionRef, eventData);
};

export const apiupdateEventById = async (updatedEventData, eventId) => {
  const eventDoc = doc(db, 'events', eventId);
  return await updateDoc(eventDoc, updatedEventData);
};

export const apiDeleteEventById = async (eventId) => {
  const eventDoc = doc(db, 'events', eventId);
  return await deleteDoc(eventDoc);
};

export const uploadImage = async (imageFile) => {};
