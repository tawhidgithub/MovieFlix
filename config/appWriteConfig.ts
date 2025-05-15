import { Account, Client, Databases } from 'appwrite';




export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
 export const COLLECTION_SAVE_MOVIE_ID =
  process.env.EXPO_PUBLIC_APPWRITE_SAVE_MOVIE_COLLECTION_ID!;

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);



export  const database = new Databases(client);

export const account=new Account(client)







