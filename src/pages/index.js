import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Addlike } from "../Components/Addlike";
import UserContext from "../context/context";
export default function Home() {
  const router = useRouter();
  const [deleteFact, setDeleteFact] = useState(true);
  const [allFacts, setAllFacts] = useState("");
  const userName = useContext(UserContext);
  useEffect(() => {
    const getFacts = async () => {
      await axios
        .get("https://quiz-app-backend-cvvj.onrender.com/facts", {})
        .then((response) => {
          console.log("34wred", response);
          const body = response.data;
          setAllFacts(body);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const isUserLoggedIn = () => {
      const user = localStorage.getItem("user");
      if (!user) [router.push("/login")];
    };
    isUserLoggedIn();

    getFacts();
  }, []);
  return (
    <div>
      <img
        style={{
          width: "100%",
          height:"300000%",
          zIndex: "-1",
          position: "absolute",
          backgroundSize: "cover",
          filter: "blur(5px)",
        }}
        src="ba.jpeg"
      />{" "}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgb(236,207,148)",
            position:"fixed",
            width:"100%",
            padding: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <button
            style={{ fontSize: "30px", padding: "0px", width: "20%" }}
            onClick={() => router.push("myAcc")}
          >
            {" "}
            my account
          </button>
          <button
            style={{ fontSize: "30px", padding: "0px", width: "20%" }}
            onClick={() => router.push("post")}
          >
            create post
          </button>
          <button
            style={{ fontSize: "30px", padding: "0px", width: "20%" }}
            onClick={() => setDeleteFact(!deleteFact)}
          >
            {deleteFact ? "Hide " : "Show "}
          </button>
        </div>

        <div>
          <div
            style={{
              padding: "10px 100px",
            }}
          >
            <div style={{}}>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop:"150px"
                  }}
                >
                  {allFacts.length > 0 &&
                    allFacts.map((data) => {
                      return (
                        <div
                          style={{
                            padding: "0px",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "900px",
                              padding: "20px",
                              border: "5px solid black",
                              borderRadius: "15px",
                              backgroundColor: "rgb(236,207,148)",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                              display: deleteFact ? "" : "none",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "15px",
                                borderBottom: "black 0.5px solid",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ marginRight: "15px" }}>
                                  {" "}
                                  <img
                                    style={{
                                      borderRadius: "50%",
                                      width: "40px",
                                      height: "40px",
                                    }}
                                    src="profile.jpeg"
                                    alt="Profile"
                                  />
                                </div>
                                <span
                                  style={{ fontSize: "16px", color: "#333" }}
                                >
                                  {userName && <p>Welcome, {userName}!</p>}
                                </span>
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: "30px",
                                color: "black",
                                marginBottom: "10px",
                              }}
                            >
                              {data.title}
                            </div>
                            <div style={{ color: "black", marginBottom: "15px" }}>
                              {data.text}
                            </div>
                            <div>
                              {userName && (
                                <p
                                  style={{
                                    color: "#555",
                                    marginBottom: "10px",
                                  }}
                                >
                                  Welcome, {userName}!
                                </p>
                              )}
                            </div>
                            <Addlike data={data} />
                            <div style={{ color: "black", fontSize: "12px" }}>
                              {data.date}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
