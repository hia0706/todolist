const tempSection = document.querySelector('.temperature');
const placeSection = document.querySelector('.place');
const iconSection = document.querySelector('.weather-icon');

const API_KEY = config.WEATHER_API_KEY;

// 위치 정보 허용 시
function onGeoSuccess(position) {
    // console.log(position);
    const lat = position.coords.latitude; // 위도
    const lon = position.coords.longitude; // 경도
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    // fetch 를 사용하면 응답 데이터를 JSON 으로 인코딩해야 사용 가능
    fetch(url).then((response) => response.json())
        .then((json) => { // json 변환
            console.log(json);
            const temperature = Math.round(json.main.temp);
            const place = json.name;
            const icon = json.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            tempSection.innerHTML = temperature + "°C";
            placeSection.innerHTML = place;
            iconSection.setAttribute('src', iconURL);
        });
}

// 위치 정보 거부
const onGeoErr = () => {
    alert("사용자가 현재 위치 추적 허용하지 않았습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoErr);