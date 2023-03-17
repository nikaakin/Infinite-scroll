import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/user.scss";
import DisplayUsers from "./DisplayUsers";

interface User {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
  email: string;
  ip: string;
  company: {
    name: string;
    suffix: string;
  };
  address: {
    zipCode: string;
    city: string;
    streetAddress: string;
    country: string;
    state: string;
  };
}

const User: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();

  useEffect(() => {
    let controller = new AbortController();
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`,
      { signal: controller.signal }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));

    return () => controller.abort();
  }, [id]);

  return (
    <React.Fragment>
      <div className="user">
        <div className="user__image">
          <img alt={user?.name} src={`${user?.imageUrl}?${user?.lastName}`} />
        </div>
        <div className="user__info">
          <div className="user__header">Info</div>
          <div className="user__general">
            <div className="user__name">
              {user?.prefix} {user?.name} {user?.lastName}
            </div>
            <div className="user__title"> {user?.title}</div>
          </div>

          <div className="user__main-info">
            <div className="user__email">
              {" "}
              <span className="user__title-span">Email</span>: {user?.email}
            </div>
            <div className="user__ip">
              {" "}
              <span className="user__title-span">IP Address</span>: {user?.ip}
            </div>
            <div className="user__job--descriptor">
              {" "}
              <span className="user__title-span">Job Descriptor</span>:{" "}
              {user?.jobDescriptor}
            </div>
            <div className="user__job--type">
              {" "}
              <span className="user__title-span">Job Type</span>:{" "}
              {user?.jobType}
            </div>
            <div className="user__job--area">
              {" "}
              <span className="user__title-span">Job Area</span>:{" "}
              {user?.jobArea}
            </div>
          </div>
        </div>
        <div className="user__address">
          <div className="user__header">Address</div>
          <div className="user__name">
            {user?.company.name} {user?.company.suffix}
          </div>

          <div className="user__address--city">
            {" "}
            <span className="user__title-span">City</span>: {user?.address.city}
          </div>
          <div className="user__address--country">
            {" "}
            <span className="user__title-span">Country</span>:{" "}
            {user?.address.country}
          </div>
          <div className="user__address--state">
            {" "}
            <span className="user__title-span">State</span>:{" "}
            {user?.address.state}
          </div>
          <div className="user__address--street">
            <span className="user__title-span">Street</span>:{" "}
            {user?.address.streetAddress}
          </div>
          <div className="user__address--zip">
            {" "}
            <span className="user__title-span">Zip</span>:{" "}
            {user?.address.zipCode}
          </div>
        </div>
      </div>
      <div>
        <DisplayUsers />
      </div>
    </React.Fragment>
  );
};

export default User;
