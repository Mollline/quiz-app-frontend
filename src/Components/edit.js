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

export const Edit = ({ data, allFacts, setAllFacts }) => {
  const router = useRouter();
  const ID = data._id;
  const [title, setTitle] = React.useState(data.title);
  const [text, setText] = React.useState(data.text);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editFact = async (newTitle, newText) => {
    try {
      const response = await axios.put(`https://quiz-app-backend-cvvj.onrender.com/facts/${ID}`, {
        title: newTitle,
        text: newText,
      });

      // Update local state with edited values
      setTitle(newTitle);
      setText(newText);

      // Update the allFacts state
      setAllFacts((prevFacts) => {
        const updatedFacts = [...prevFacts];
        const factIndex = updatedFacts.findIndex((fact) => fact._id === ID);

        if (factIndex !== -1) {
          updatedFacts[factIndex] = {
            ...updatedFacts[factIndex],
            title: newTitle,
            text: newText,
          };
        }

        return updatedFacts;
      });

      // Close the modal
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button style={{ color: "red" }} onClick={handleOpen}>
        Edit Fact
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
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>Text</div>
            <input
              style={{ height: "30px" }}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Typography>
          <button onClick={() => editFact(title, text)}>Edit</button>
        </Box>
      </Modal>
    </div>
  );
};
