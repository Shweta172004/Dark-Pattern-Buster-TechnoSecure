const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    const buttonText = button.textContent.toLowerCase();
    if (buttonText.includes(searchValue)) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
});

async function getData() {
  const response = await fetch("updated_dark-patterns-ranked.json");
  if (!response.ok) {
    throw new Error("Failed to fetch JSON file");
  }
  const jsonData = await response.json();
  return jsonData;
}

async function processData() {
  try {
    const jsonData = await getData();
    console.log("JSON data:", jsonData);

    const btnContainer = document.getElementById("button-container");

    for (const nestedObject of jsonData) {
      const button = document.createElement("button");
      button.textContent = nestedObject.url;
      button.classList.add("button");
      button.addEventListener("click", () => select(nestedObject));
      btnContainer.appendChild(button);
    }

    select(jsonData[0]);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

processData();

////////// CHART CONFIGS /////////////

//////////////////////////////////////

const select = (obj) => {
  if (window.bread instanceof Chart) {
    window.bread.destroy();
  }

  const mainChart = document.getElementById("main-chart").getContext("2d");

  const chartConfig = {
    type: "doughnut",
    data: {
      labels: [
        "Sneaking",
        "Urgency",
        "Misdirection",
        "Social Proof",
        "Scarcity",
        "Obstruction",
        "Forced Action",
      ],
      datasets: [
        {
          label: "Distribution of Dark Patterns",
          data: [
            obj["Sneaking"],
            obj["Urgency"],
            obj["Misdirection"],
            obj["Social Proof"],
            obj["Scarcity"],
            obj["Obstruction"],
            obj["Forced Action"],
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderColor: [
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 16,
            },
            color: "#ffffff",
            padding: 15,
          },
        },
        title: {
          display: true,
          text: obj.url,
          font: {
            size: 36,
          },
          color: "#ffffff",
          padding: 24,
        },
      },
    },
  };

  window.bread = new Chart(mainChart, chartConfig);

  const deceptionDiv = document.getElementById("deception");
  deceptionDiv.innerHTML = "";

  const categoryParagraph = document.createElement("p");
  categoryParagraph.className = "category";
  categoryParagraph.textContent = obj.category;

  const rankParagraph = document.createElement("p");
  rankParagraph.className = "rank";

  const rankSpan = document.createElement("span");
  rankSpan.className = "num";
  rankSpan.textContent = obj.global_rank;

  rankParagraph.appendChild(document.createTextNode("Rank: "));
  rankParagraph.appendChild(rankSpan);

  const deceptiveParagraph = document.createElement("p");
  const isDeceptive = obj.deceptive=="True"; 
  deceptiveParagraph.className = isDeceptive ? "deceptive" : "non-deceptive";
  deceptiveParagraph.textContent = isDeceptive ? "Deceptive" : "Not Deceptive";

  // Append paragraphs to the div
  deceptionDiv.appendChild(categoryParagraph);
  deceptionDiv.appendChild(rankParagraph);
  deceptionDiv.appendChild(deceptiveParagraph);

  document.getElementById("rpm").innerText = obj["reach_per_million"];
  document.getElementById("pvpm").innerText = obj["page_views_per_million"];
  document.getElementById("pvpu").innerText = obj["page_views_per_user"];

};

select(1);
