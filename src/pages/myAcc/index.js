import { useRouter } from "next/navigation";
import axios, { all } from "axios";
import React, { useState, useEffect, use } from "react";
import { Edit } from "@/Components/edit";
import { Addlike } from "@/Components/Addlike";
import { Delete } from "@/Components/Delete";
import { Create } from "@/Components/create";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [allFacts, setAllFacts] = useState("");

  useEffect(() => {
    const myfacts = async () => {
      const age = localStorage.getItem("age");
      const userName = localStorage.getItem("userName");
      const ID = localStorage.getItem("_id");
      setData({ age, userName, ID });
      await axios
        .get(`https://quiz-app-backend-cvvj.onrender.com/facts/${ID}`, {})
        .then((response) => {
          const body = response.data;
          setAllFacts(body);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    myfacts();
  }, []);
  return (
    <div style={{ backgroundColor: "RGB(240, 242,245)" }}>
      <div>
        <div
          style={{
            display: "flex",
            border: "grey 1px solid",
            justifyContent: "space-around",
            backgroundColor: "white",
            padding: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
            position: "fixed",
            width: "100%",
          }}
        >
          <button
            style={{
              fontSize: "30px",
              border: "none",
              backgroundColor: "white",
              fontSize: "25px",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/")}
          >
            all posts
          </button>
          <button
            style={{
              fontSize: "30px",
              border: "none",
              backgroundColor: "white",
              fontSize: "25px",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/login")}
          >
            log out
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ paddingTop: "100px" }}>
            <img
              style={{ width: "300px", borderRadius: "50%", height: "300px" }}
              src="p.png"
            />
          </div>
          <div style={{ fontSize: "40px", color: "black", padding: "30px" }}>
            {data.userName}
          </div>
          <div
            style={{
              padding: "40px",
              backgroundColor: "white",
              border: "1px grey solid",
              borderRadius: "30px",
              width: "40%",
            }}
          >
            <div style={{ color: "black", fontSize: "20px" }}>
              Username : {data.userName}
            </div>
            <div style={{ color: "black", fontSize: "20px" }}>
              Age : {data.age}
            </div>
            <div style={{ color: "black", fontSize: "20px" }}>
              Id : {data.ID}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div
              style={{
                paddingTop: "10px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {allFacts.length > 0 &&
                    allFacts.map((data) => {
                      const factId = data._id;
                      return (
                        <div
                          style={{
                            padding: "10px",
                            border: "1px solid grey",
                            borderRadius: "5px",
                            width: "900px",
                            backgroundColor: "white",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "15px 20px",
                              borderBottom: "2px solid #ddd",
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div style={{ marginRight: "15px" }}>
                                {" "}
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    padding: "10px",
                                  }}
                                  src="p.png"
                                />
                              </div>
                              <span style={{ fontSize: "16px", color: "#555" }}>
                                {/* {userName && <p>Welcome, {userName}!</p>} */}
                              </span>
                            </div>

                            <Delete factId={factId} setAllFacts={setAllFacts} />
                          </div>
                          <div style={{ padding: "15px 20px" }}>
                            <div
                              style={{
                                fontSize: "24px",
                                color: "black",
                                fontWeight: "bold",
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
                            <Addlike data={data} />
                            <Edit data={data} setAllFacts={setAllFacts} />
                            <div style={{ color: "grey", fontSize: "14px" }}>
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
