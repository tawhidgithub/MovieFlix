import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Result } from "@/Model/movieItemModel";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Result) => {
  return (
    <Link href={`/detailsPage/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "htt[s://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} />
          <Text className="text-xs text-white font-bold uppercase">
            {" "}
            {vote_average ? Math.round(vote_average / 2) : "N/A"}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.toString()?.split("-")[0]}
          </Text>
          <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
