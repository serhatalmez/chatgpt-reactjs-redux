import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { History, Buttons } from "./Components";
import store from "./store";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let [obj, setObj] = useState({ choices: [] });
  const [payload, setPayLoad] = useState({
    prompt: "",
    temperature: 0.5,
    n: 1,
    max_tokens: 1024,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["Q:", "A:"],
    model: "text-davinci-003"
  });

  
  const getRes = () => {
    setLoading(true);
    setError(false);
    // prompt length check
    if (payload.prompt.length < 10) {
      setError("Your question is too short. Please ask a longer question.");
      setLoading(false);
      return;
    }
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "Bearer "
      }
    })
    .then((res) => {
      console.log(res);
      responseHandler(res);
    })
    .catch((e) => {
      setLoading(false);
      console.log(e.message, e);
    });
  };

  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <div className="header">
        <p className="subName">q?a</p>
        <p>/ KizilAI</p>
      </div>

      <Provider store={store}>
        <History />
      </Provider>
    
      <div className="container">
        <div className="d-flex">
          <div className="col-6 text_wrap">
            <textarea
              type="text"
              placeholder="Ask a question..."
              style={{ resize: "none" }}
              readOnly={loading}
              onChange={(e) => {
                setPayLoad({
                  ...payload,
                  prompt: e.target.value
                });
              }}
              value={payload.prompt}
            />
          </div>
          <div className="col-6 text_wrap">
            <p>
              {loading ? (
                <span>Waiting for answer...</span>
              ) : (
                obj?.choices?.map((v, i) => <div>{v.text}</div>)
              )}
            </p>
          </div>
        </div>
        <div style={{ padding: "0 13px" }}>
          <button disabled={loading} onClick={getRes}>
            {loading ? "Waiting for answer... " : "Ask!"}
          </button>
          <Provider store={store}>
            <Buttons />
          </Provider>
        </div>
        <div>
          <p className="errorMsg">{error ? error : ""}</p>
        </div>
      </div>
      <div className="footer">
        <ul style={{listStyle: "none", marginTop: "30px"}}>
          <li>
            <a target={"_blank"} rel="noreferrer" href="https://github.com/serhatalmez/chatgpt-reactjs-redux/">Github Project</a>
          </li>
          <li>
            Developed with <span role="img" aria-label="heart">❤️</span> by <a className="visit" target={"_blank"} rel="noreferrer" href="https://github.com/serhatalmez">almez</a>
          </li>
        </ul>
      </div>
    </div>
  );
}