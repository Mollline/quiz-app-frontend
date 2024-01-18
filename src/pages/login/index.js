import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import UserContext from "@/context/context";

export default function Home() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [requireError, setRequireError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handlePassword = (e) => {
    if (password.length < 8) {
      setPasswordError("More than 8 characters");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    if (email.includes("@")) {
      setEmailError("");
    } else {
      setEmailError("Invalid email");
    }
    setemail(e.target.value);
  };

  const loginUser = async (email, password) => {
    await axios
      .post("https://quiz-app-backend-cvvj.onrender.com/login", {
        password,
        email,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setUserName(userName);
        localStorage.setItem("user", true);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("_id", data._id);
        localStorage.setItem("age", data.age);
        router.push("/");
      })
      .catch((err) => {
        setRequireError(err.response.data);
      });
  };
  const changeRoute = () => {
    router.replace("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('bac.jpeg')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "300px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: "bold",
            padding: "30px",
          }}
        >
          Log in
        </div>
        <div style={{ padding: "10px 40px " }}>
          <div>
            <input
              style={{ width: "220px", height: "30px", padding: "10px" }}
              type="text"
              placeholder="Email or phone number"
              id="email"
              name="search"
              value={email}
              onChange={handleEmail}
              autoComplete="off"
            />
          </div>
          <div style={{ color: "red" }}>{emailError}</div>
        </div>
        <div style={{ padding: "10px 40px " }}>
          <div>
            <input
              style={{ width: "220px", height: "30px", padding: "10px" }}
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={handlePassword}
              autoComplete="off"
            />
          </div>
          <div style={{ color: "red" }}>{passwordError}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div onClick={() => router.push("")}>
            <div style={{ paddingTop: "-700px" }}>
              <div
                style={{
                  width: "220px",
                  height: "35px",
                  padding: "10px",
                  backgroundColor: "RGB(57,117,234)",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => (changeRoute(), loginUser(email, password))}
              >
                Login
              </div>
            </div>
            <div style={{ color: "red" }}>{requireError}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px ",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "45px",
                  backgroundColor: "RGB(101, 181,67)",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => router.push("signup")}
              >
                Create new account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
