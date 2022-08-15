import { IClient } from "../interface/IClient";

function ClientInfo(props: IClient) {
  return (
    <div>
      <p>
        <b>Name</b>: {props.title} {props.first} {props.last}
      </p>
      <p>
        <b>Email</b>: {props.email}
      </p>
    </div>
  );
}

export default ClientInfo;
