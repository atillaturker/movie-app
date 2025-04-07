import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovieDetails } from "@/services/api";
import { FavoriteService } from "@/services/favoriteService";
import { useMutation } from "@/services/useMutation";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import MovieCard from "../../components/movieCard";

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { mutate: loadFavorites } = useMutation(FavoriteService.getFavorites, {
    onSuccess: (ids) => {
      setFavoriteIds(ids);
      loadMovies(ids);
    },
    onError: (error) => {
      console.error("Favori yükleme hatası:", error);
      setLoading(false);
      setError(true);
    },
  });

  const loadMovies = async (ids: string[]) => {
    try {
      if (ids.length === 0) {
        setMovies([]);
        return;
      }

      const moviePromises = ids.map((id) => fetchMovieDetails(id));
      const movieResults = await Promise.all(moviePromises);
      setMovies(movieResults.filter(Boolean));
    } catch (error) {
      console.error("Film detay yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [favoriteIds]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Favorite Movie
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  marginBottom: 10,
                  paddingRight: 5,
                }}
                scrollEnabled={false}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Favorites;
