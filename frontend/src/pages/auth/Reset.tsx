import Button from "../../components/Button";
import FormLayout from "../../components/layout/FormLayout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PasswordField from "../../components/PasswordField";

const RESET_USER_MUTATION = gql`
  mutation UpdatePassword($id:ID!, $password:String!){
  updatePassword(id:$id, password: $password){
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

export function Reset() {
    const { id } = useParams(); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [updatePassword, { data, loading, error }] =
    useMutation(RESET_USER_MUTATION);

  const handleReset = async () => {
    updatePassword({
        variables:{
            id: id,
            password: password,
        }
    });
    navigate('/login')
    console.log("success")
  };
  return (
    <FormLayout>
      <div className="text-3xl font-medium p-5 w-[500px]">
        Reset Your Password
      </div>
      <div className="border-b-2 border-gray-200"></div>
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        <div className="text-gray-500">
          Please enter a new password below to change your password.
        </div>
        <PasswordField
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
      </div>
      <div className="border-b-2 border-gray-200"></div>
      <div className="flex w-full items-center justify-end gap-5 p-3">
        <Button
          style="bg-pgray w-[20%] text-gray-500 font-medium rounded p-2 "
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
        <Button
          style="bg-fblue w-[20%] text-white font-medium rounded p-2 "
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </FormLayout>
  );
}
