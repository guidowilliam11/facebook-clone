import Button from "../../components/Button";
import FormLayout from "../../components/layout/FormLayout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import emailJS from '@emailjs/browser';

const FORGET_USER_QUERY = gql`
  query FindUser($email: String!) {
    findUser(email: $email) {
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

export function Forget() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(FORGET_USER_QUERY, {
    variables: { email },
  });

  const handleSearch = async () => {
    if(data){
      const Params = {
        from_name: "Facebook",
        to_name: data.findUser.firstName + " " +data.findUser.lastName,
        email_id: email,
        activation_link: 'http://localhost:5173/reset-password/'+data.findUser.id,
        message: "Inorder to change password of your account please click the link above.",
        from_developer: "Guido William"
      };
      await emailJS.send('service_tzn8jbo', 'template_o8v6ppn', Params, 'i6ioDzSSLevUUkeDg')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
      return;
    }
    console.log("user not found")
  };
  return (
    <FormLayout>
      <div className="text-3xl font-medium p-5 w-[500px]">
        Find Your Account
      </div>
      <div className="border-b-2 border-gray-200"></div>
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        <div className="text-gray-500">
          Please enter you email address or mobile number to search for you
          account.
        </div>
        <input
          className="border border-gray-200 rounded p-3 w-full"
          type="email"
          placeholder="Email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </FormLayout>
  );
}
