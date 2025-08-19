import { useState } from "react";

import { UsernameInput } from "./components/UsernameInput";

import "./App.css";
import { AlgorithmSelect } from "./components/AlgorithmSelect";
import { ContributionsGraph } from "./components/ContributionsGraph";
import { useContributions } from "./lib/github";
import { ContributionsLoading } from "./components/ContributionsLoading";

function App() {
  const [username, setUsername] = useState("chornonoh-vova");
  const [algorithm, setAlgorithm] = useState("bubble");

  const { data: contributions, isLoading } = useContributions(username);

  return (
    <main className="main">
      <h1>GitFrag</h1>
      <p style={{ marginBlockEnd: "32px" }}>
        Organize your commits, the old-school way
      </p>

      <section className="controls">
        <UsernameInput
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="actions-group">
          <AlgorithmSelect
            label="Algorithm"
            name="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          />
          <button className="btn">Defrag</button>
        </div>
      </section>

      {isLoading ? (
        <ContributionsLoading />
      ) : (
        <ContributionsGraph
          contributions={JSON.stringify(contributions, null, 2)}
        />
      )}
    </main>
  );
}

export default App;
