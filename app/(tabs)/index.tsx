import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested", // Silences this specific warning
]);

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovie({ query: "" }));

  return (
    <SafeAreaView className="flex-1  ">
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full  z-0" />

        <ScrollView
          className="flex-1 px-5 "
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 10,
          }}
        >
          <Image source={icons.logo} className="w-12 h-10 mt-9 mx-auto" />

          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text>Error :{moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                placeHolder="Search"
                onPress={() => router.push("/search")}
              />
              <>
                <Text className="text-lg font-bold text-white  mt-5 mb-3">
                  Latest Movie
                </Text>

                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <Text className="text-white text-sm">{item.title}</Text>
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mb-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
