import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function getClients() {
      const { data, error } = await supabase
        .from("clients")
        .select("id, clientname:client_name, user_id");

      if (error) {
        console.error("Error fetching clients:", error);
        return;
      }
      if (data) {
        setClients(data);
      }
    }
    getClients();
  }, [clients]);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-primary-foreground font-bold">
        Welcome to the Clients Page
      </h1>
      <div className="mt-8">
        {clients.length === 0 ? (
          <h1>Clients list is empty &#128517;</h1>
        ) : (
          clients.map((client) => (
            <div key={client.id}>
              <p className="text-2xl text-primary-foreground font-bold">
                {client.clientname}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clients;
