import { useAuth } from "../auth/useAuth";

const Users = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-primary-foreground font-bold">
          Welcome to the Users Page
        </h1>
      </div>
      <div className="mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          user && (
            <h1 className="max-w-md border rounded-md px-4 py-6 text-2xl font-bold bg-accent shadow-2xl">
              {user.userName}
            </h1>
          )
        )}
      </div>
    </div>
  );
};

export default Users;
