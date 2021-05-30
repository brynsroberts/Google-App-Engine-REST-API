import { useEffect, useState } from "react";
import UserInfo from "./components/UserInfo";
import SignIn from "./components/SignIn";
import "./App.css";
import axios from "axios";

function Authentication(props) {
  const [id_token, setIdToken] = useState(undefined);
  const [id_user, setIDUser] = useState(undefined);
  const [self, setSelf] = useState(undefined);

  useEffect(() => {
    axios
      .get("https://robertb2-restapi.wl.r.appspot.com/users/token/info")
      .then((res) => {
        setIdToken(res.data.id_token);
        setIDUser(res.data.id_user);
        setSelf(res.data.self);
      })
      .catch(() => {
        console.log("error");
      });
  }, [id_token]);
  return (
    <div>
      <SignIn id_token={id_token} />
      {id_token !== undefined && (
        <UserInfo id_token={id_token} id_user={id_user} self={self} />
      )}
    </div>
  );
}

export default Authentication;
