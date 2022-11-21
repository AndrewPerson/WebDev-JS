const LOGIN_URL = `https://student.sbhs.net.au/api/authorize?response_type=code&scope=all-ro&state=abc&client_id=IDForge&redirect_uri=http://localhost:5500/callback.html`;

const bellTemplate = document.getElementById("bell").content;
const periodTemplate = document.getElementById("period").content;

if (localStorage.getItem("Token") == null) {
    //Not logged in.
    location.href = LOGIN_URL;
}
else {
    //Logged in.
    let token = JSON.parse(localStorage.getItem("Token"));
    
    fetch("https://student.sbhs.net.au/api/timetable/daytimetable.json", {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    })
    .catch(e => {
        location.href = LOGIN_URL;
    })
    .then(async response => {
        let dailyTimetable = await response.json();
        let dailyTimetableElement = document.getElementById("daily-timetable");

        if (Array.isArray(dailyTimetable.roomVariations)) dailyTimetable.roomVariations = {};
        if (Array.isArray(dailyTimetable.classVariations)) dailyTimetable.classVariations = {};

        for (let bell of dailyTimetable.bells) {
            let period = dailyTimetable.timetable.timetable.periods[bell.period];
            let hasPeriod = period !== undefined && "fullTeacher" in period && "year" in period;

            let roomVariation = dailyTimetable.roomVariations[bell.period];
            let hasRoomVariation = roomVariation !== undefined;

            let classVariation = dailyTimetable.classVariations[bell.period];
            let hasClassVariation = classVariation !== undefined;

            if (hasPeriod) {
                let periodElement = periodTemplate.cloneNode(true);

                periodElement.querySelector(".name").textContent = period.title;
                periodElement.querySelector(".time").textContent = bell.time;

                let teacher = periodElement.querySelector(".teacher");
                if (hasClassVariation) {
                    teacher.textContent = period.casualSurname ?? period.casual;
                    teacher.classList.add("changed");
                }
                else {
                    teacher.textContent = period.fullTeacher;
                    teacher.classList.remove("changed");
                }

                let room = periodElement.querySelector(".room");
                if (hasRoomVariation) {
                    room.textContent = roomVariation.roomTo;
                    room.classList.add("changed");
                }
                else {
                    room.textContent = period.room;
                    room.classList.remove("changed");
                }

                dailyTimetableElement.appendChild(periodElement);
            }
            else {
                let bellElement = bellTemplate.cloneNode(true);

                bellElement.querySelector(".name").textContent = bell.bellDisplay;
                bellElement.querySelector(".time").textContent = bell.time;

                dailyTimetableElement.appendChild(bellElement);
            }
        }
    });
}