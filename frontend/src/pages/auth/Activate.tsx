import Button from "../../components/Button";
import FormLayout from "../../components/layout/FormLayout";
import { gql, useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

const ACTIVATE_USER_MUTATION = gql`
  mutation ActivateUser($id: ID!) {
    activateUser(id: $id)
  }
`;

export function Activate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activateUser, { data, loading, error }] = useMutation(
    ACTIVATE_USER_MUTATION
  );

  const handleActivate = () => {
    try {
      activateUser({
        variables: {
          id: id,
        },
      }).then((response) => {
        if (response.data.activateUser) {
            navigate('/login');
        }
      });
      console.log({ data, loading, error });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormLayout>
      <div className="flex flex-col justify-center items-center w-[350px]">
        <div className="flex flex-col justify-center items-center w-full px-4 py-5 gap-7">
          <div className="text-3xl font-medium">You're all set!</div>
          <div className="text-base text-center">
            Thanks for signing up and welcome to Facebook! Please click the
            button below to activate you account and get started:
          </div>
          <Button
            style="bg-fblue w-full text-white font-medium rounded m-auto p-4 my-4"
            onClick={handleActivate}
          >
            Activate Account
          </Button>
          <div className="text-xs w-full">
            If you have any question, please contact our support staff at{" "}
            <span>
              <a
                href="https://www.instagram.com/guido.william1029/"
                className="text-blue-600"
              >
                guido.william123321@gmail.com
              </a>
            </span>{" "}
            or get in touch with our developer drectly.
          </div>
        </div>
      </div>
    </FormLayout>
  );
}
