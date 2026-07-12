import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {

    async function checkSession() {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);

    }

    checkSession();

    const {
      data: listener,
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setSession(session);

      }
    );

    return () => {

      listener.subscription.unsubscribe();

    };

  }, []);

  if (loading) {

    return (

      <div className="flex h-screen items-center justify-center">

        <h1 className="text-2xl font-bold">

          Memuat...

        </h1>

      </div>

    );

  }

  if (!session) {

    return <Navigate to="/login" replace />;

  }

  return children;

}

export default ProtectedRoute;