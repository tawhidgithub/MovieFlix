import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import { updateSearchCount } from "@/services/appWrith";
import useFetch from "@/services/useFetch";
import { Query } from "appwrite";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
    reFetch: loadMovie,
    reset,
  } = useFetch(() => fetchMovie({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovie();

        // console.log(`search Query :${searchQuery}`);
        // console.log(`Movie Length :${movies.length}`);
      } else {
        reset();
      }
    }, 800);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    if (Array.isArray(movies) && movies.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className=" flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 w-full absolute z-0" />
      <FlatList
        data={movies}
        numColumns={3}
        keyExtractor={(item) => item.id}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeHolder={"Search"}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {movieLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {movieError && (
              <Text className="text-red-500 px-5 my-3">
                Error:{movieError.message}
              </Text>
            )}
            {!movieLoading &&
              !movieError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  {" "}
                  Search Result for : {}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No Movie Found" : "Search for a  Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
