import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { IClient } from "../interface/IClient";
import Card from "react-bootstrap/esm/Card";
import ClientInfo from "./clientInfo";

function Home() {
  const [clientInfo, setClientInfo] = useState<IClient>({
    title: "",
    first: "",
    last: "",
    email: "",
  });
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });
  const refresh = () => {
    getClientInfo();
  };

  const getClientInfo = async () => {
    setStatus({ ...status, loading: true });
    await axios
      .get("https://randomuser.me/api")
      .then((res) => {
        var result = res.data.results;
        if (result && result[0].length < 0) {
          setStatus({ ...status, loading: false, error: true });
        } else {
          var full_name =
            result[0].name.title +
            " " +
            result[0].name.first +
            " " +
            result[0].name.last;
          localStorage.setItem("full_name", full_name);
          localStorage.setItem("email", result[0].email);
          setClientInfo({
            title: result[0].name.title,
            first: result[0].name.first,
            last: result[0].name.last,
            email: result[0].email,
          });
          setStatus({ ...status, loading: false, error: false });
        }
      })
      .catch((err) => {
        setStatus({ ...status, error: true });
      });
  };

  useEffect(() => {
    getClientInfo();
    // console.log(localStorage.getItem('email'));
  }, []);

  let statusMessage = "";

  if (status.error) {
    statusMessage = "Something went wrong.";
  } else if (status.loading) {
    statusMessage = "Loading...";
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
          <br />
          <Card className="mt-3">
            <Card.Body className="p-5">
              {statusMessage ? (
                <p className="status-message">{statusMessage}</p>
              ) : (
                <ClientInfo
                  title={clientInfo.title}
                  first={clientInfo.first}
                  last={clientInfo.last}
                  email={clientInfo.email}
                />
              )}

              <Button variant="success" onClick={refresh}>
                Refresh
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
