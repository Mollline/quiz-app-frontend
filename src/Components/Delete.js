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

export const Delete = ({ factId, onFactDeleted, setAllFacts }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteFact = async () => {
    try {
      await axios.delete(`https://quiz-app-backend-cvvj.onrender.com/facts/${factId}`, {});
    } catch (err) {
      handleClose();
      router.push('/')
      console.log(err);
    }
  };

  return (
    <div>
      <Button style={{ color: "red" }} onClick={handleOpen}>
        X
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>Are you sure to delete this fact??!!</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Add your description content here */}
          </Typography>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <div>
              <button onClick={handleClose}>NO</button>
            </div>
            <div>
              <button onClick={deleteFact}>YES</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
