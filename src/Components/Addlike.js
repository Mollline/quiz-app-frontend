import { useEffect, useState } from "react";
import axios from "axios";

export const Addlike = (props) => {
  const add = props.data.likes;
  const dis = props.data.dislike;

  const [likes, setLikes] = useState(add);
  const [disLike, setDisLike] = useState(dis);

  const userID = localStorage.getItem("_id");
  const like = async () => {
    console.log(props.data._id)
    await axios
      .post(
        `https://quiz-app-backend-cvvj.onrender.com/facts/addlikes/${props.data._id}/${userID}`,
        {}
      )
      .then((response) => {
        console.log(response)
        setLikes(response.data.likes);
        setDisLike(response.data.dislike);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dislike = async () => {
    await axios
      .post(
        `https://quiz-app-backend-cvvj.onrender.com/facts/dislike/${props.data._id}/${userID}`,
        {}
      )
      .then((response) => {
        setDisLike(response.data.dislike);
        setLikes(response.data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div style={{ color: "black", padding: "10px" }}>
        <button onClick={like}>like</button> {likes.length}
      </div>
      <div style={{ color: "black", padding: "10px" }}>
        <button onClick={dislike}>dislike</button> {disLike.length}
      </div>
    </>
  );
};
