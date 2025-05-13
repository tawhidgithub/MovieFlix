import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { getTheSaveMovie, saveTheMovie } from "@/services/appWrith";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import Index from ".";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  const { data: movieData, loading } = useFetch<SavedMovie[]>(() =>
    getTheSaveMovie()
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary flex-1">
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : (
          movieData && (
            <View className="flex-col gap-5 items-center">
              <Text className="text-white text-lg">Saved Shows</Text>

              <FlatList
                numColumns={3}
                data={movieData}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{
                  justifyContent: "center",
                  gap: 20,
                  paddingRight: 10,
                  marginBottom: 10,
                }}
                className="mb-2 pb-32"
                scrollEnabled={false}
              />
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({});
