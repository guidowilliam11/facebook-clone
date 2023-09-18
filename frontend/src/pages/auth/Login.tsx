import { gql, useMutation } from "@apollo/client";
import { EncryptStorage } from "encrypt-storage";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormLayout from "../../components/layout/FormLayout";
import PasswordField from "../../components/PasswordField";

export const encryptStorage = new EncryptStorage("GuidoWilliam", {
  encAlgorithm: "Rabbit",
});

const LOGIN_USER_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { data, loading, error }] =
    useMutation(LOGIN_USER_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          email: email,
          password: password,
        },
      });
      const token = data?.loginUser;

      const currentTime = new Date().getTime();
      const expirationTime = currentTime + 7 * 24 * 60 * 60 * 1000;

      encryptStorage.setMultipleItems([
        ["jwtToken", token],
        ["expireTime", expirationTime],
      ]);
      const getData = encryptStorage.getMultipleItems([
        "jwtToken",
        "expireTime",
      ]);

      if (getData.jwtToken == "") {
        console.log("No data found in localStorage.");
        return;
      } else {
        const currentTime = new Date().getTime();

        if (currentTime <= getData.expireTime) {
          navigate('/');
          return;
        } else {
          console.log("Token has expired.");
        }
      }
    } catch (error) {
      // Handle login errors here
      // console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <FormLayout>
        <div className="p-4 flex flex-col justify-center items-center gap-4 w-[400px]">
          <div className="text-center text-lg">Log in to Facebook</div>
          <input
            className="border border-gray-200 rounded p-3 w-full"
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />

          <Button
            style="bg-fblue w-full text-white font-medium rounded m-auto p-3 "
            onClick={handleLogin}
          >
            Log in
          </Button>
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <Link
              className="text-blue-600 text-base w-full text-center"
              to="/forget"
            >
              Forgotten account?
            </Link>

            <div className="flex items-center w-full">
              <div className="flex-grow border-b-2 border-gray-300"></div>
              <div className="mx-2 text-gray-300">or</div>
              <div className="flex-grow border-b-2 border-gray-300"></div>
            </div>

            <Link
              className="bg-[#00A700] w-[50%] text-white font-medium rounded m-auto p-3 text-center"
              to="/register"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </FormLayout>
    </>
  );
}
