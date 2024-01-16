import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useStyleRegistry } from "styled-jsx";

export default function Home() {
  const router = useRouter();
  const [required, setRequired] = useState("");
  const [confirmPasswordError, setConfrimpasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [ageError, setAgeError] = useState("");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [age, setAge] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const handleAge = (e) => {
    const newAge = e.target.value;
    if (newAge < 18) {
      setAgeError("Must be 18 or older");
    } else {
      setAgeError("");
    }
    setAge(newAge);
  };

  const handleUserName = (e) => {
    if (userName.length < 4) {
      setUserNameError("More than 4 character");
    } else {
      setUserNameError("");
    }
    setUserName(e.target.value);
  };
  const handleEmail = (e) => {
    if (email.includes("@")) {
      setEmailError("");
      console.log("email==>" + email);
    } else {
      setEmailError("invalid email");
    }
    setEmail(e.target.value);
  };
  const handlepassword = (e) => {
    if (password.length < 8) {
      setpasswordError("More than 8 charachter");
    } else {
      setpasswordError("");
      console.log("password==>" + password);
    }
    setpassword(e.target.value);
  };
  const createUser = async () => {
    if (
      userName === "" ||
      password === "" ||
      email === "" ||
      age === "" ||
      confirmPassword === ""
    ) {
      setRequired("enter all inputs");
    } else {
      await axios
        .post("https://quiz-app-backend-cvvj.onrender.com/signup", {
          userName,
          password,
          email,
          age,
          confirmPassword,
        })
        .then((response) => {
          console.log(response);
          router.push("/login");
          alert("user created");
        })
        .catch((err) => {
          alert("user already taken");
          console.log(err);
        });
    }
    if (confirmPassword !== password) {
      setConfrimpasswordError("write same password");
    }
  };
  return (
    <div style={{}}>
      <img
        style={{
          width: "100%",
          height: "100%",
          zIndex: "-1",
          position: "absolute",
          backgroundSize: "cover",
          filter: "blur(5px)",
        }}
        src="bac.jpeg"
      />
      <div
        style={{ fontSize: "50px", padding: "50px" }}
        onClick={() => router.push("/login")}
      >
        back
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "200px",
        }}
      >
        <div
          style={{
            width: "350px",
            height: "",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "bold",
                paddingTop: "30px",
                paddingBottom: "10px",
              }}
            >
              Sign up
            </div>
            <div style={{ display: "flex", paddingBottom: "10px" }}>
              <div style={{ paddingTop: "10px", paddingLeft: "50px" }}>
                <div>
                  <input
                    style={{ width: "160px", height: "30px", padding: "10px" }}
                    type="userName"
                    placeholder="userName"
                    id="userName"
                    value={userName}
                    onChange={handleUserName}
                  />
                </div>
                <div style={{ color: "red" }}>{userNameError}</div>
              </div>
              <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
                <div>
                  <input
                    style={{ width: "70px", height: "30px", padding: "10px" }}
                    type="age"
                    placeholder="age"
                    id="age"
                    value={age}
                    onChange={handleAge}
                  />
                </div>
                <div style={{ color: "red" }}>{ageError}</div>
              </div>
            </div>
            <div style={{ padding: "10px 50px " }}>
              <div>
                <input
                  style={{ width: "250px", height: "30px", padding: "10px" }}
                  type="text"
                  placeholder="Email or phone number"
                  id="email"
                  name="search"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div style={{ color: "red" }}>{emailError}</div>
            </div>
            <div style={{ padding: "10px 50px " }}>
              <div>
                <input
                  style={{ width: "250px", height: "30px", padding: "10px" }}
                  type="password"
                  placeholder="password"
                  id="password"
                  value={password}
                  onChange={handlepassword}
                />
              </div>
              <div style={{ color: "red" }}>{passwordError}</div>
            </div>

            <div style={{ padding: "10px 50px " }}>
              <div>
                <input
                  style={{ width: "250px", height: "30px", padding: "10px" }}
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
              <div style={{ color: "red" }}>{confirmPasswordError}</div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "150px",
              }}
            >
              <div onClick={() => router.push("")}>
                <div
                  style={{
                    width: "250px",
                    height: "35px",
                    padding: "10px",
                    backgroundColor: "RGB(57,117,234)",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-100px",
                  }}
                  onClick={() => createUser(email, password, userName, age)}
                >
                  Sign up
                </div>
                <div style={{ color: "red" }}>{required}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
