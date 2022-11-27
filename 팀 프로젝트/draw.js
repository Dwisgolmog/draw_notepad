const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 680;
canvas.height = 570;
ctx.lineWidth = 2;

//이전으로 되돌리기 빈배열 생성
let restore_array = [];
let index = 0;

let painting = false;

//painting을 멈추게 함
function stopPainting(){ 
    painting = false;
    //마우스를 때거나 요소밖으로 나갔을때의 마지막 상태를 저장
}

//painting을 하게 함
function startPainting(){
    painting = true;

    //마우스를 클릭했을때의 그림값을 배열에 저장함 
    restore_array.push(ctx.getImageData(0,0,canvas.width, canvas.height));
    index += 1;
}

//마우스 좌표값에 따른 그리기
function onMouseMove(event){
    const x = event.offsetX; //x값 지정
    const y = event.offsetY; //y값 지정
    
    if(painting){
        ctx.lineTo(x,y); //현재 하위 경로의 마지막 지점을 지정된(x,y) 좌페 직선으로 연결한다
        ctx.stroke(); //현재 획 스타일로 현재 하위 경로를 획한다.
    }else{
        ctx.beginPath(); //하위 경로 목록을 비운다
        ctx.moveTo(x,y); //새 하위 경로의 시작점을 (x,y) 좌표로 이동
    }
}

//되돌리기
function undo_js(){
    if(index > 0){
        index -= 1;
         ctx.putImageData(restore_array[index],0,0);
         restore_array.pop();
    }
}

//그림판 리셋
function reset_js(){
    if(confirm("그림판을 리셋하시겠습니까?")){
        ctx.clearRect(0,0,canvas.width,canvas.height); //화면 초기화
    }
}

//그림그리기를 클릭했을때 시작
if(true){
    //각 이벤트리스트 기능 추가
canvas.addEventListener("mousedown",startPainting); //마우스를 눌렀을때
canvas.addEventListener("mousemove",onMouseMove); //마우스를 움직일때
canvas.addEventListener("mouseup",stopPainting); //마우스를 땠을때
canvas.addEventListener("mouseleave",stopPainting); //마우스가 요소밖일때
}

//색 아이콘 보이기
function open_color(){
    if(document.getElementById('opencolor').style.display === 'block'){
        document.getElementById('opencolor').style.display = 'none';
    }else{
        document.getElementById('opencolor').style.display = 'block';
    }
}

//색 조정
const color = document.getElementsByClassName("jsColor")
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}
Array.from(color).forEach(color => color.addEventListener("click",handleColorClick)); //추후 해석 필요

//굵기 조정 아이콘 보이기
function open_border(){
    if(document.getElementById('openBorder').style.display === 'block'){
        document.getElementById('openBorder').style.display = 'none';
    }else{
        document.getElementById('openBorder').style.display = 'block';
    }
}


//굵기 조정
const range = document.getElementById("jsRange");
range.addEventListener("input",handleRangeClick);
function handleRangeClick(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

//지우기 기능
const eraser = document.getElementById("eraser_js");
eraser.addEventListener("click",eraserJs); //지우개 버튼을 클릭시 eraserJs 함수 호출
let era = false;
function eraserJs(){
    if(era == true){
        era = false;
        ctx.strokeStyle = "black";
        document.getElementById("change").src = "image/eraser.png";
    }else{
        era = true;
        ctx.strokeStyle = "white";
        document.getElementById("change").src = "image/pen.png";
    }
}

//도형 그리기 아이콘 보이기
function open_shape(){
    if(document.getElementById('openShape').style.display === 'block'){
        document.getElementById('openShape').style.display = 'none';
    }else{
        document.getElementById('openShape').style.display = 'block';
    } 
}

//도형 그리기
let shape
function shape_js(shape){
    ctx.fillStyle = ctx.strokeStyle;
    const dr_x = Number(prompt("도형을 그릴 위치 x값 입력하시오"));
    const dr_y = Number(prompt("도형을 그릴 위치 y값 입력하시오"));
    
    //사각형 그리기
    if(shape == 'square'){                  
        const length = prompt("사각형 한변의 길이를 입력하시오");

        ctx.fillRect(dr_x,dr_y,length,length);
    //삼각형 그리기
    }else if(shape == 'triangle'){
        const length = Number(prompt("삼각형의 높이를 입력하시오"));
        
        ctx.beginPath();
        ctx.moveTo(dr_x,dr_y); 
        ctx.lineTo(dr_x+length,dr_y);
        ctx.lineTo(dr_x+length/2,dr_y-length);
        ctx.closePath();
        ctx.fill();
    //원 그리기
    }else{
        const radius = Number(prompt("원의 반지름을 입력하시오"));

        ctx.beginPath();
        ctx.arc(dr_x,dr_y,radius,0,2 * Math.PI);
        ctx.fill();
    }

}

//이미지 불러오기
function theimage(){
    var input = document.getElementById("file");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event){
        var imga = document.getElementById("previewImg");
        imga.src = event.target.result;
    }
}

//이미지 넣기
function load_img(){
    const pa_x = Number(prompt("그림을 그릴 위치 x값 입력하시오"));
    const pa_y = Number(prompt("그림을 그릴 위치 y값 입력하시오"));
    const pa_size = Number(prompt("그림의 크기를 입력하시오"));

    var imgsrc = document.getElementById("previewImg");
    var img = new Image();
    img.src = imgsrc.src;
    img.onload = ctx.drawImage(img,pa_x,pa_y,pa_size,pa_size);
}

//저장하기  --> 작동이 되지 않음
const addButton = document.querySelector("#save");
const area = document.querySelector(".canvas");

addButton.addEventListener('click', () => {
  if(confirm("저장하시겠습니까?")==true){
    console.log(area.value);
    localStorage.setItem("canvas", area.value);
  }
  else{
    return false;
  }
});

window.onload = () => {
    if (localStorage.getItem("canvas", area.value)) {
      if (confirm("최근 저장한 글을 불러오시겠습니까?")) {
        console.log(localStorage.getItem("canvas", area.value));

        document.querySelector(".area").innerText =
          localStorage.getItem("canvas", area.value);
      } else {
        localStorage.removeItem("canvas", area.value);
      }
    }
  };