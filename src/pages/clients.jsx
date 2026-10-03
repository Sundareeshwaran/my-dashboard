import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";

const Clients = () => {
  const { user, loading: authLoading } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const countryCode = {
    US: "+1",
    CA: "+1",
    GB: "+44",
    AU: "+61",
    IN: "+91",
  };

  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    let cancelled = false;

    const getClients = async () => {
      try {
        const res = await api.get("/clients");
        if (!cancelled) {
          setClients(res.data);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        if (!cancelled) {
          setError(
            error.response?.data?.error ||
              "Unable to load clients. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getClients();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-primary-foreground font-bold">
        Welcome to the Clients Page
      </h1>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {authLoading || loading ? (
          <p>Loading clients...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : clients.length === 0 ? (
          <h1>Clients list is empty &#128517;</h1>
        ) : (
          clients.map((client) => (
            <div
              className="bg-primary rounded-2xl px-4 py-2 min-w-sm shadow hover:scale-105 transition-transform cursor-pointer"
              key={client.id}
            >
              <p className="text-2xl text-primary-foreground font-bold">
                {client.clientname}
              </p>
              <p className="text-sm text-accent-foreground font-bold">
                {countryCode.IN} {client.phonenumber}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clients;
