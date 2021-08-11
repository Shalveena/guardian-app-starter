import React, { useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [validationmsg, setValidationmsg] = useState("");

  const doSearch = async () => {
    if (term.length <= 0) {
      setValidationmsg("Please input search term");
    } else {
      const resultSet = await axios.get("/api/search", {
        params: {
          term: term,
        },
      });
      setValidationmsg("");
      setResults(resultSet.data);
    }
  };

  return (
    <div>
      <h1>Guardian Search</h1>
      <div>
        <input value={term} onChange={(evt) => setTerm(evt.target.value)} />
        <button onClick={() => doSearch()}>Search</button>
        <div>{validationmsg}</div>
      </div>
      <div>
        <h2>Results</h2>
        <ul>
          {results.map((result) => {
            return (
              <li>
                <a href={result.url}>{result.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
