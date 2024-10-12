import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === null) {
      navigate("/");
    }
  }, [userId, navigate]);

  return children;
};

export default ProtectedRoute;
