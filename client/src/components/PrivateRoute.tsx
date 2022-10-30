import { useAppSelector } from "../hooks";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }: { children: any }) => {
  const { user } = useAppSelector((state) => state.auth);

  return user?.user?._id ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
