import React, { useState } from "react";
import button from "bootstrap/dist/js/bootstrap.min.js";

function AiDropdown(props) {
  const [selectedModel, setSelectedModel] = useState("OPENAI"); // TODO: change structure to properly initialize the dropdown

  function switchModel(model) {
    console.log("Switching model to: ", model);
    fetch("/set_model", {
      method: "POST",
      body: JSON.stringify({ model: model }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log("Model switched: ", resData);
        setSelectedModel(resData.result.toUpperCase());
      })
      .catch((err) => console.log(err));
  }

  const handleSelect = (model) => {
    model = model.toLowerCase();
    console.log(model)
    switchModel(model);
  };

  return (
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedModel}
      </button>
      <ul class="dropdown-menu">
        <li>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => handleSelect("OPENAI")}
          >
            OPENAI
          </a>
        </li>
        <li>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => handleSelect("CLAUDE")}
          >
            CLAUDE
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AiDropdown;
