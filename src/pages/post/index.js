import { useRouter } from "next/navigation";
import axios, { all } from "axios";
import React, { useState, useEffect } from "react";

import { Create } from "@/Components/create";
export default function Home() {
  const userId = localStorage.getItem("_id");
  const router = useRouter();
  const [userID, setUserID] = useState(`${userId}`);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const createFact = async (title, text, userID) => {
    await axios
      .post("https://quiz-app-backend-cvvj.onrender.com/facts", {
        title,
        text,
        userID,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
      alert('Fact Created')
    router.push("/");
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
        src="ba.jpeg"
      />
      <div
        style={{ fontSize: "50px", padding: "50px" }}
        onClick={() => router.push("/")}
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
              Post facts
            </div>
            <div style={{ display: "flex", paddingBottom: "10px" }}>
              <div style={{ paddingTop: "10px", paddingLeft: "50px" }}>
                <div>Title</div>
                <div>
                  <input
                    style={{
                      width: "160px",
                      height: "30px",
                      padding: "10px",
                      fontSize: "20px",
                    }}
                    type="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
              <div style={{ paddingTop: "10px", paddingLeft: "50px", display:"none"}}>
                <div>userID</div>
                <div>
                  <input
                    style={{
                      width: "160px",
                      height: "30px",
                      padding: "10px",
                      fontSize: "20px",
                    }}
                    type="title"
                    onChange={(e) => setUserID(e.target.value)}
                    value={userID}
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "10px 50px " }}>
              <div>Text</div>
              <div>
                <input
                  style={{ width: "250px", height: "100px", padding: "10px" }}
                  type="text"
                  name="search"
                  value={text}
                  //   onChange={(e) => e.target.value}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
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
                  onClick={() => createFact(title, text, userID)}
                >
                  Create fact
                </div>
              </div>
            </div>
            <Create />
          </div>
        </div>
      </div>
    </div>
  );
}
