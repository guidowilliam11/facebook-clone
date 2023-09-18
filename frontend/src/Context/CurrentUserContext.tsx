import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { EncryptStorage } from "encrypt-storage";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

// Initialize EncryptStorage
export const encryptStorage = new EncryptStorage("GuidoWilliam", {
  encAlgorithm: "Rabbit",
});

interface Props {
  children: ReactNode;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  status: boolean;
}

interface CurrentUserContextType {
  user: User | null;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);

export function CurrentUserDetail() {
  return useContext(CurrentUserContext);
}

const GET_TOKEN_USER_QUERY = gql`
  query GetUserByToken($token: String!) {
    getUserByToken(token: $token) {
      id
      firstName
      lastName
      email
      dob
      gender
      status
    }
  }
`;

const UserDetailProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [currentUserValue, setCurrentUserValue] =
    useState<CurrentUserContextType>({ user: null });
// 
  const { data, loading } = useQuery(GET_TOKEN_USER_QUERY, {
    variables: { token },
  });

  useEffect(() => {
    const currentTime = new Date().getTime();

    const { jwtToken, expireTime } = encryptStorage.getMultipleItems([
      "jwtToken",
      "expireTime",
    ]);
    if (currentTime <= expireTime) {
      setToken(jwtToken);
    } else {
      navigate("/login");
      console.log("Token has expired.");
    }
  }, []);

  useEffect(() => {
    setCurrentUserValue({ user: data?.getUserByToken || null });
  }, [data]);

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default UserDetailProvider;
