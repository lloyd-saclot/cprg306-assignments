"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  //sign in
  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  //sign out
  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      {!user ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to Shopping List</h1>
          <button
            onClick={handleSignIn}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Login with GitHub
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">
            Welcome, {user.displayName || "User"} ({user.email})
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/week-9/shopping-list"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Go to Shopping List
            </Link>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </main>
  );
}