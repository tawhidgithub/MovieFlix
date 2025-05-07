import { Result } from "@/Model/movieItemModel";
import { Client, Databases, Query } from "appwrite";

const DATABASE_ID=process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID=process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client=new Client().setEndpoint('https://cloud.appwrith.io.v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);


const database = new Databases(client);


export const updateSearchCount = async (query:string, movie:Result)=>{

const result= await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
Query.equal('searchTerm',query)

])
console.log(`data Result from App Write:${result}`);



}