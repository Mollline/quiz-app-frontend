import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Addlike } from "../Components/Addlike";
import UserContext from "../context/context";
import { Create } from "../Components/create";
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
    <div style={{ backgroundColor: "RGB(240, 242,245)", height: "100%" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "white",
            border: "1px grey solid",
            position: "fixed",
            width: "100%",
            padding: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <button
            style={{
              fontSize: "30px",
              padding: "0px",
              width: "20%",
              border: "none",
              backgroundColor: "white",
              fontSize: "25px",
              fontWeight: "bold",
              color:'black'
            }}
            onClick={() => router.push("myAcc")}
          >
            {" "}
            my account
          </button>
          <Create />

          <button
            style={{
              fontSize: "30px",
              padding: "0px",
              width: "20%",
              border: "none",
              backgroundColor: "white",
              fontSize: "25px",
              fontWeight: "bold",
              color:'black'
            }}
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
                    marginTop: "65px",
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
                            paddingTop: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "60vw",
                              padding: "20px",
                              borderRadius: "5px",
                              border: "1px solid grey",
                              backgroundColor: "White",
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
                                      padding:'10px',
                                      width: "40px",
                                      height: "40px",
                                    }}
                                    src="p.png"
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
                            <div
                              style={{ color: "black", marginBottom: "15px" }}
                            >
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
                            <div style={{ color: "grey", fontSize: "12px" }}>
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
