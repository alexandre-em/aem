type AuthProviderValueType = {
  user: User | null;
  googleSignIn: () => void;
  logOut: () => void;
};
