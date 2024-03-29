import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// const userID = localStorage.getItem("_id");
// console.log(userID)
export const Create = (props) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const createFact = async (title, text) => {
    const userId = localStorage.getItem("_id");
    await axios
      .post(`https://quiz-app-backend-cvvj.onrender.com/facts`, {
        title,
        text,
        userID:userId,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
    router.push("/myAcc");
  };

  return (
    <div>
      <Button style={{ color: "black",fontSize:"1.5vw",fontWeight:"bold" }} onClick={handleOpen}>
        Create post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>Title</div>
            <input
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>text</div>
            <input
              style={{ height: "30px" }}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
          </Typography>
          <button onClick={() => createFact(title, text)}>create</button>
        </Box>
      </Modal>
    </div>
  );
};
