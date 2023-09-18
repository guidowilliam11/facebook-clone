import Button from "../../components/Button";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import $ from "jquery";
import PasswordField from "../../components/PasswordField";
import FormLayout from "../../components/layout/FormLayout";
import { Link } from "react-router-dom";
import emailJS from '@emailjs/browser';

const CREATE_USER_MUTATION = gql`
  mutation Create($inputUser: NewUser!) {
    createUser(inputUser: $inputUser) {
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

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [day, setDay] = useState("11");
  const [month, setMonth] = useState("11");
  const [year, setYear] = useState("2003");
  const [eyeStatus, setEye] = useState("close");
  const [createUser, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);

  const handleRegister = () => {
    const dob = day + "-" + month + "-" + year;
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      dob == "" ||
      gender == ""
    ) {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000);
      return;
    }

    try {
      const inputUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dob: dob,
        gender: gender,
        status: false,
      };

      createUser({
        variables: {
          inputUser: inputUser,
        },
      }).then(async (response) => {
        console.log(response.data.createUser.id);
        const Params = {
          from_name: "Facebook",
          to_name: firstName + " " +lastName,
          email_id: email,
          activation_link: 'http://localhost:5173/activate/'+response.data.createUser.id,
          message: "Inorder to activate your account please click the link above.",
          from_developer: "Guido William"
        };
        await emailJS.send('service_tzn8jbo', 'template_o8v6ppn', Params, 'i6ioDzSSLevUUkeDg')
        .then((response) => {
          console.log('Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
      })

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setDay("");
      setMonth("");
      setYear("");
      setGender("");

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000); // Show success popup for 3 seconds
    } catch (error) {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 3000); // Show error popup for 3 seconds
    }
  };

  useEffect(() => {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      today = new Date(),
      // default targetDate is christmas
      targetDate = new Date(today.getFullYear(), 11, 25);

    setDate(targetDate);
    setYears(100); // set the next five years in dropdown

    $("#select-month").change(function () {
      var monthIndex = $("#select-month").val();
      setDays(monthIndex);
    });

    function setDate(date: any) {
      setDays(date.getMonth());
      $("#select-day").val(date.getDate());
      $("#select-month").val(date.getMonth());
      $("#select-year").val(date.getFullYear());
    }

    // make sure the number of days correspond with the selected month
    function setDays(monthIndex: any) {
      var optionCount = $("#select-day option").length,
        daysCount = daysInMonth[monthIndex];

      if (optionCount < daysCount) {
        for (var i = optionCount; i < daysCount; i++) {
          $("#select-day").append(
            $("<option></option>")
              .attr("value", i + 1)
              .text(i + 1)
          );
        }
      } else {
        for (var i = daysCount; i < optionCount; i++) {
          var optionItem = "#select-day option[value=" + (i + 1) + "]";
          $(optionItem).remove();
        }
      }
    }

    function setYears(val: any) {
      var year = today.getFullYear();
      for (var i = 0; i < val; i++) {
        $("#select-year").append(
          $("<option></option>")
            .attr("value", year - i)
            .text(year - i)
        );
      }
    }
  }, []);

  return (
    <FormLayout>
      <div className="w-full border-b-2 p-4">
        <div className="text-3xl font-bold text-center">
          Create a new account
        </div>
        <div className="text-base text-gray-400 text-center">
          It's quick and easy
        </div>
      </div>
      <div className="flex flex-col gap-3 p-6 w-full">
        <div className="flex gap-4">
          <input
            className="border border-gray-200 rounded p-3 w-[48%]"
            type="text"
            placeholder="First name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="border border-gray-200 rounded p-3 w-[48%]"
            type="text"
            placeholder="Last name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <div className="w-full flex flex-col gap-2">
          <div className="text-xs w-full">Date of birth</div>
          <div className="flex justify-between items-center w-full">
            <select
              id="select-day"
              className=" border border-gray-200 rounded p-1 w-[30%]"
              value={day}
              required
              onChange={(e) => {
                setDay(e.target.value);
              }}
            ></select>
            <select
              id="select-month"
              className=" border border-gray-200 rounded p-1 w-[30%]"
              value={month}
              required
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select
              id="select-year"
              className=" border border-gray-200 rounded p-1 w-[30%]"
              value={year}
              required
              onChange={(e) => setYear(e.target.value)}
            ></select>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-xs w-full">Gender</div>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between items-center border border-gray-200 rounded p-1 px-2 w-[30%] ">
                <label htmlFor="Female">Female</label> {" "}
              <input
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between items-center border border-gray-200 rounded p-1 px-2 w-[30%]">
                <label htmlFor="Male">Male</label> {" "}
              <input
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between items-center border border-gray-200 rounded p-1 px-2 w-[30%]">
                <label htmlFor="Custom">Custom</label> {" "}
              <input
                type="radio"
                id="Custom"
                name="gender"
                value="Custom"
                onChange={(e) => setGender(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="text-xs w-full">
          People who use our service may have uploaded your contact information
          to Facebook.{" "}
          <span>
            <a href="" className="text-blue-600">
              Learn more
            </a>
          </span>
        </div>
        <div className="text-xs w-full">
          By clicking Sign Up, you agree to our{" "}
          <span>
            <a href="" className="text-blue-600">
              Terms, Privacy Policy
            </a>
          </span>{" "}
          and{" "}
          <span>
            <a href="" className="text-blue-600">
              Cookies Policy
            </a>
          </span>
          . You may receive SMS notifications from us and can opt out at any
          time
        </div>
        <Button
          style="bg-[#00A700] w-[50%] text-white font-medium rounded m-auto p-3 "
          onClick={handleRegister}
        >
          Sign Up
        </Button>
        <Link className="text-blue-600 text-lg w-full text-center" to="/login">
          Already have an account?
        </Link>
      </div>
    </FormLayout>
  );
}
