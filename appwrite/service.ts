import { Account, Client, ID } from "appwrite";

const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const appwriteClient = new Client();

type CreateUserAccount = {
  email: string;
  password: string;
  username: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;
  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appwriteClient);
  }

  async createUserAccount({ email, password, username }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );

      if (userAccount) {
        return userAccount;
      }
    } catch (error) {
      console.log(`Appwrite Service Error :: createUserAccount() ${error} `);
      throw error;
    }
  }

  async loginUser({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`Appwrite Service Error :: loginUser() ${error} `);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(`Appwrite Service Error :: getCurrentUser() ${error} `);
      throw error;
    }
  }

  async logoutUser() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log(`Appwrite Service Error ::logoutUser() ${error} `);
      throw error;
    }
  }
}

export default AppwriteService;
