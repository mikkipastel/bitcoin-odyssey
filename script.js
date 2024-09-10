document.addEventListener("DOMContentLoaded", function() {
    loadTimeline('en');
});

function loadTimeline(language) {
    // choose banner file
    const banner = document.getElementById("banner");
    banner.src = language === 'th' ? 'images/banner_th.png' : 'images/banner_en.png';

    // change title
    const title = document.getElementById("timeline-title")
    title.innerHTML = language === 'th' ? "กาลเวลาของ Bitcoin" : 'Timeline of Bitcoin';
    
    // choose json file
    const file = language === 'th' ? 'data/timeline_th.json' : 'data/timeline_en.json';

    fetch(file)
        .then(response => response.json())
        .then(data => {
            const timelineContainer = document.getElementById("timeline");
            // clear data
            timelineContainer.innerHTML = '';
            // set data
            data.events.forEach((event) => {
                const eventElement = document.createElement("div");
                eventElement.className = "timeline-event";
                eventElement.innerHTML = `<h3>${event.date}</h3><h2>${event.title}</h2><p>${event.description}</p>`;
                timelineContainer.appendChild(eventElement);
            });
        })
        .catch(error => console.error("Error loading timeline data:", error));
}
