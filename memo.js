//폰트 크기 조정
function font_size(val){
    if(val == "10"){
    document.getElementById("text_m").style.fontSize = "10pt";
    }
    else if(val == "15"){
        document.getElementById("text_m").style.fontSize = "15pt";
    }
    else if(val == "20"){
    document.getElementById("text_m").style.fontSize = "20pt";
    }
    else if(val == "25"){
    document.getElementById("text_m").style.fontSize = "25pt";
    }
}
//글꼴 바꾸기
function font_change(val){
    if(val == "1"){
        document.getElementById("text_m").style.fontFamily = "나눔스퀘어";
    }
    else if(val == "2"){
         document.getElementById("text_m").style.fontFamily = "휴먼범석체";
    }
    else if(val == "3"){
        document.getElementById("text_m").style.fontFamily = "평창평화체";
    }
    else if(val == "4"){
        document.getElementById("text_m").style.fontFamily = "교보손글씨2020박도연";
    }
}
//폰트 굵게
function bold(){
    document.getElementById("text_m").style.fontWeight = "700";
}
//폰트 굵기 원래대로
function normal(){
    document.getElementById("text_m").style.fontWeight = "400";
}

const addButton = document.querySelector("#addButton");
const area = document.querySelector(".area");
const loadButton = document.querySelector("#loadButton");

//저장
addButton.addEventListener('click', () => {
 
  if(confirm("저장하시겠습니까?")==true){
    console.log(area.value);
    localStorage.setItem("#text_m", area.value);
  }
  else{
    return false;
  }
});

//불러오기
loadButton.addEventListener ('click', ()=> {
    if (localStorage.getItem("#text_m", area.value)) {
      if (confirm("최근 저장한 글을 불러오시겠습니까?")) {
        console.log(localStorage.getItem("#text_m", area.value));

        document.querySelector(".area").innerText =
          localStorage.getItem("#text_m", area.value);
      } else {
        localStorage.removeItem("#text_m", area.value);
      }
    }
  });