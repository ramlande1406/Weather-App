const apiKey = "54d775b17fcb3054e306297934545bef";

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const loader = document.getElementById("loader");
  const result = document.getElementById("weatherResult");

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Show loader, hide result
    loader.style.display = "block";
    result.style.display = "none";

    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found. Please try again.");

    const data = await res.json();

    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const iconCode = data.weather[0].icon;
    const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

    document.getElementById("resultCity").textContent = capitalizedCity;
    document.getElementById("resultTemp").textContent = Math.round(temp);
    document.getElementById("resultCondition").innerHTML = `
      ${weather}
      <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="${weather}" style="width:120px;height:120px;vertical-align:middle;margin-left:10px;">
    `;

    result.style.display = "flex";
  } catch (error) {
    alert(error.message || "Something went wrong!");
  } finally {
    loader.style.display = "none";
  }
});
