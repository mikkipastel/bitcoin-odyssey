document.addEventListener("DOMContentLoaded", function () {
    fetch("data/timeline.json")
        .then(response => response.json())
        .then(data => {
            const timelineContainer = document.getElementById("timeline");
            data.events.forEach((event, index) => {
                const eventElement = document.createElement("div");
                eventElement.className = "timeline-event " + (index % 2 === 0 ? "left" : "right");
                eventElement.innerHTML = `<h3>${event.date}</h3><h2>${event.title}</h2><p>${event.description}</p>`;
                timelineContainer.appendChild(eventElement);
            });
        })
        .catch(error => console.error("Error loading timeline data:", error));
});
