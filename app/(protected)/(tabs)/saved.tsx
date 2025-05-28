import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { getTheSaveMovie, saveTheMovie } from "@/services/appWrith";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import Index from ".";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getTheMovie } from "@/store/movieSlice";

const Saved = () => {
const dispatch = useDispatch<AppDispatch>()
const {getMovieData,getMovieError,getMovieLoading}=useSelector((state:RootState)=>state.movie)
const {userID}=useSelector((state:RootState)=>state.auth)

useEffect(()=>{
  dispatch(getTheMovie(userID!))
},[])


  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary flex-1">
        {getMovieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : (
          getMovieData && (
            <View className="flex-col gap-5 items-center">
              <Text className="text-white text-lg">Saved Shows</Text>

              <FlatList
                numColumns={3}
                data={getMovieData}
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
