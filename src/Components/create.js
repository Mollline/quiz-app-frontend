import * as React from "react";
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
  const user = localStorage.getItem("_id");
  const router = useRouter();
  const [userID, setUserID] = React.useState(`${user}`);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const createFact = async (title, text) => {
    await axios
      .post(`https://quiz-app-backend-cvvj.onrender.com/facts`, {
        title,
        text,
        userID,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
      router.push("/");
      alert("created successfully");
  };

  return (
    <div>
      <Button style={{ color: "red" }} onClick={handleOpen}>
        create Fact using different way
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
            <input
              style={{ height: "30px", display:'none'}}
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            ></input>
          </Typography>
          <button onClick={() => createFact(title, text, userID)}>
            create
          </button>
        </Box>
      </Modal>
    </div>
  );
};
