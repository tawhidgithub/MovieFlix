import { Result } from "@/Model/movieItemModel";
import { account, COLLECTION_ID, COLLECTION_SAVE_MOVIE_ID, COLLECTION_USER_ID, database, DATABASE_ID } from "@/config/appWriteConfig";
import { ID, Permission, Query, Role } from 'appwrite';
import { deleteLoginSession, saveLoginSession, saveUserData } from "./databaseStorage";




/// update the metrice data base
export const updateSearchCount = async (query: string, movie: Result) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    console.log("Data Result from Appwrite:", JSON.stringify(result, null, 2));

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (err) {
    console.log(`Error :${err}`);
    throw err;
  }
};
// get the metrice database data
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
// save the movie in Database
export const saveTheMovie = async (movie: MovieDetails) => {
  try {
    console.log(`Image path =>:https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    
    const result = await database.createDocument(
      DATABASE_ID,
      COLLECTION_SAVE_MOVIE_ID,
              ID.unique(),
            {
        title: movie.title!,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        type: "Movie",
        rating: movie.vote_average ? `${movie.vote_average / 2}` : "N/A",
        release_year: movie.release_date?.toString().split("-")[0]!,
        saved:true,
      }
    );

    console.log(`------save------${JSON.stringify(result)}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// get the saved movie from Database 
export const getTheSaveMovie = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_SAVE_MOVIE_ID
    );

    console.log(`------------${result}`);

    return result.documents as unknown as SavedMovie[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// Registration type or props type
interface signUpProps{
Email:string,Password:any,Name:any


}
export const SingUp=async ({Email,Password,Name}:signUpProps)=>{

try {
  // create account in appwrite

 const user = await account.create(ID.unique(),Email,Password,Name)

 await database.createDocument(DATABASE_ID,COLLECTION_USER_ID,user.$id,{
name:Name,
email:Email

 }).then(()=>{

   console.log(`User Data have been save to AppWrite Database `);

 })
     Permission.read(Role.user(user.$id)), Permission.write(Role.user(user.$id))



} catch (error) {
  console.log(error);
  throw error
  
}

}
// Login type or props type

interface loginToAccountProps{

Email:string,
Password:any

}
/// Login to Account 
export const loginToAccount=async ({Email,Password}:loginToAccountProps)=>{
try {
  





 const  user = await account.createEmailPasswordSession(Email,Password);
 console.log(`---Session data${JSON.stringify(user)}`);

 saveLoginSession(user)
 



 const userData= await database.getDocument(DATABASE_ID,COLLECTION_USER_ID,user.userId)
 console.log(`User Data :-${JSON.stringify(userData)}`);
 
 saveUserData({name:userData.name,email:userData.email})



 


} catch (error) {
  console.log(error);
  throw error;
  
}


}
/// LogOut from Account
export const logOutFromAccount=async ()=>{
try {
  

  deleteLoginSession();
return await account.deleteSession('current');

 


} catch (error) {
  console.log(error);
  throw error;
  
}


}

