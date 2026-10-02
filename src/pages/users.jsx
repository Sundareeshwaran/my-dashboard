import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase.js";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUserList() {
      const { data, error } = await supabase
        .from("users")
        .select("id, username:user_name");

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }

      if (data) {
        setUsers(data);
      }
    }

    getUserList();
  }, [users]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-primary-foreground font-bold">
        Welcome to the Users Page
      </h1>

      <div className="mt-8">
        {users.map((user) => (
          <div key={user.id}>
            <p className="text-2xl text-primary-foreground font-bold">
              {user.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
