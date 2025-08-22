import { ContributionsDefragmentation } from "./components/ContributionsDefragmentation";

import "./App.css";
import { logout, useUser } from "./lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./components/Spinner";

function Main({
  authenticated = false,
  username,
}: {
  authenticated?: boolean;
  username: string;
}) {
  if (!authenticated) {
    return (
      <a
        className="btn btn-primary"
        style={{ width: "fit-content" }}
        href="/api/login"
      >
        Sign in with GitHub
      </a>
    );
  }

  return <ContributionsDefragmentation initialUsername={username} />;
}

function App() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useUser();

  const onLogoutClick = async () => {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <main className="main">
      <h1>
        GitFrag
        {data?.authenticated && (
          <button style={{ float: "right" }} onClick={onLogoutClick}>
            Logout
          </button>
        )}
      </h1>

      <p className="subtitle">Organize your commits, the old-school way</p>

      {isLoading ? (
        <Spinner />
      ) : (
        <Main
          authenticated={data?.authenticated}
          username={data?.username || ""}
        />
      )}
    </main>
  );
}

export default App;
