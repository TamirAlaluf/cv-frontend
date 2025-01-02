"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types"; // Import the correct type

interface UserContextType {
  user: UserResource | null | undefined;
  usageLeft: number | null;
  setUsageLeft: React.Dispatch<React.SetStateAction<number | null>>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { isLoaded: isAuthLoaded } = useAuth();
  const [usageLeft, setUsageLeft] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsageLeft = async () => {
      // Only fetch if wef don't have the email in context
      if (
        isAuthLoaded &&
        isUserLoaded &&
        user?.emailAddresses?.[0]?.emailAddress
      ) {
        setIsLoading(true);
        const currentEmail = user.emailAddresses[0].emailAddress;
        console.log("fetching usage left");
        try {
          const response = await fetch(`/api/users?email=${currentEmail}`);
          if (response.ok) {
            const userData = await response.json();
            setUsageLeft(userData?.number_usage_left ?? 0);
          }
        } catch (error) {
          console.error("Failed to fetch usage count:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (isAuthLoaded && isUserLoaded && !user) {
        setUsageLeft(null);
        setIsLoading(false);
      }
    };

    fetchUsageLeft();
  }, [user, isAuthLoaded, isUserLoaded]);

  return (
    <UserContext.Provider value={{ user, usageLeft, setUsageLeft, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
