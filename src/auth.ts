interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
}

export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username: string) {
    await new Promise((r) => setTimeout(r, 800)); // fake delay
    sessionStorage.setItem("@token", JSON.stringify({ usuario: username }));
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },

  async signout() {
    await new Promise((r) => setTimeout(r, 800)); // fake delay
    sessionStorage.removeItem("@token");
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = "";
  },
};
