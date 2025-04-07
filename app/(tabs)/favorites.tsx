import { fetchMovieDetails } from "@/services/api";
import { FavoriteService } from "@/services/favoriteService";
import { useMutation } from "@/services/useMutation";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import MovieCard from "../../components/movieCard";

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const { mutate: loadFavorites } = useMutation(FavoriteService.getFavorites, {
    onSuccess: (ids) => {
      setFavoriteIds(ids);
      loadMovies(ids); // ID'ler geldikten sonra filmleri yükle
    },
    onError: (error) => {
      console.error("Favori yükleme hatası:", error);
      setLoading(false);
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
    <View className="flex-1 p-4">
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg">Henüz favori filminiz yok</Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;
