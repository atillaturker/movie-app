import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoriteServiceType {
  getFavorites(): Promise<string[]>;
  addFavorite(movieId: string): Promise<string[]>;
  removeFavorite(movieId: string): Promise<string[]>;
  toggleFavorite(movieId: string): Promise<string[]>;
}

export const FavoriteService: FavoriteServiceType = {
  async getFavorites(): Promise<string[]> {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  },

  async addFavorite(movieId: string): Promise<string[]> {
    const currentFavorites = await this.getFavorites();
    const newFavorites = [...currentFavorites, movieId];
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    return newFavorites;
  },

  async removeFavorite(movieId: string): Promise<string[]> {
    const currentFavorites = await this.getFavorites();
    const newFavorites = currentFavorites.filter((id) => id != movieId);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    return newFavorites;
  },

  async toggleFavorite(movieId: string): Promise<string[]> {
    const currentFavorites = await this.getFavorites();
    const newFavorites = currentFavorites.includes(movieId)
      ? currentFavorites.filter((id) => id !== movieId)
      : [...currentFavorites, movieId];

    return newFavorites;
  },
};
