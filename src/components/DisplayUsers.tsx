import React, { useCallback, useEffect, useRef, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserCard from "./UserCard";
import "../styles/display-users.scss";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const DisplayUsers = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { id } = useParams();
  const { data, isError, isLoading, isNextPage } = useUsers({
    page,
    size,
    userId: id ? parseInt(id) : null,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useCallback(
    (card: Element | null) => {
      if (isLoading || isError) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      if (card) {
        observer.current = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
          },
          { threshold: 0.98 }
        );
        observer.current.observe(card);
      }
    },
    [isLoading, isNextPage]
  );

  useEffect(() => {
    if (isIntersecting && isNextPage) {
      setPage((prev) => prev + 1);
    }
    setIsIntersecting(false);
  }, [isIntersecting]);

  useEffect(() => {
    setPage(1);
  }, [id]);

  return (
    <div className="display-users">
      {data.map((user, i) => {
        if (data.length - 1 === i) {
          return (
            <div key={user.id} ref={lastCardRef}>
              <UserCard {...user} />
            </div>
          );
        }
        return (
          <div key={user.id}>
            <UserCard {...user} />
          </div>
        );
      })}
      {isLoading && (
        <div className="display-users__loader">
          <Loader />
        </div>
      )}
      {isError && <div>Error</div>}
    </div>
  );
};

export default DisplayUsers;
