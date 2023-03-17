import React, { useId } from "react";
import { Link } from "react-router-dom";
import "../styles/user-card.scss";

export interface UserGeneric {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}

const UserCard: React.FC<UserGeneric> = ({
  id,
  imageUrl,
  lastName,
  name,
  prefix,
  title,
}) => {
  const uniqueId = useId();

  return (
    <Link to={`/user/${id}`} className="card">
      <div className="card__image">
        <img src={`${imageUrl}?${uniqueId}`} alt={name} />
      </div>
      <div className="card__info">
        <div className="card__name">
          {prefix} {name} {lastName}
        </div>
        <div className="card__title">{title}</div>
      </div>
    </Link>
  );
};

export default UserCard;
