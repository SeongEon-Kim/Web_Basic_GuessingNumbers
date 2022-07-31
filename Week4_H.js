var start_id;

//shuffle라는 이름을 가진 함수는 배열을 인자로 받아서, 
// Array.sort() 기능을 이용해 배열의 요소 순서를 변경합니다. 
// 배열의 요소 순서는 0 이상 1 미만의 부동소수점 난수 값을 반환하는 Math.random()를 사용합니다.
// Math.random()을 통해 반환받은 값에서 0.5를 빼면 무작위로 0보다 작은 수를 반환하기 때문에 
// Array.sort()에 식으로 사용하면 배열의 요소 순서가 무작위로 변경됩니다.
function shuffle(cards) {
    cards.sort(() => Math.random() - 0.5);
}

// 이벤트 함수에 Event를 적어주는 이유는 Event가 없으면 갖다 쓸 수 있는 함수인 줄 알고 가져갈 수 있다.
function dragStartEvent(event) {

    start_id = event.target.id; // 이전 주소 // 출발 주소의 id // e.target 대신에 this를 사용할 수도 있지만 추천하지는 않는다!
}

function dragOverEvent() {
    event.preventDefault()
}

function dropEvent(event) {

    var start = document.getElementById(start_id)   // 이전 정보(출발 정보) // 전역변수로 쓸 필요 X, 아이디 저장하지 말고 태그를 저장했어야,,!
    var destination = document.getElementById(event.target.id) // 이후 정보(도착 정보)

    console.log(start)
    console.log(destination)

    var change_tmp = start.innerHTML   // 전역변수 쓸 필요 X
    start.innerHTML = destination.innerHTML
    destination.innerHTML = change_tmp
}

function answer_ball() {

    var answers = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 정답
    var ans = 0; // 맞춘 정답 개수

    for (var index = 9; index < 18; index++) {

        if (document.getElementById(index).innerHTML == answers[index - 9]) {
            ans = ans + 1
        }
        else {
            document.getElementById("lose").innerHTML = "다시 생각해보세요~~";
        }
    }

    if (ans == 9) {
        console.log("축하합니다 승리!")
        document.getElementById("win_img").style.display = "block";
    }

}


window.onload = function () {

    var boxList = null;   // 협업, 변수는 가장 위에 선언
    var cards = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 카드를 섞기 

    boxList = document.getElementsByClassName("box")
    console.log(boxList)
    shuffle(cards);

    for (var index = 0; index < 2 * cards.length; index++) {
        var tmpDiv = document.createElement("div")   // div라는 태그를 생성한다 

        tmpDiv.className = "box"  // 생성한 태그(div)에 box라는 클래스를 적용한다.
        tmpDiv.draggable = true;
        tmpDiv.id = index;

        // function을 tmpDiv의 EventListener로 add
        //--> 각각의 요소들이 이벤트를 발생했을 때 어느 타겟에서 발생한 것인지를 모른다!
        //--> event.target.id를 통해 각각의 요소들이 갖고있는 id값을 알 수 있다.
        tmpDiv.addEventListener("dragstart", function (event) { dragStartEvent(event) })
        tmpDiv.addEventListener("dragover", function (event) { dragOverEvent(event) })
        tmpDiv.addEventListener("drop", function (event) { dropEvent(event) })

        if (index < cards.length) {
            document.getElementById("card").appendChild(tmpDiv) // div라는 태그를 answer의 자식으로 한다.
            boxList[index].innerHTML = cards[index]
            console.log(boxList)
        }
        else {
            document.getElementById("answer").appendChild(tmpDiv) // div라는 태그를 answer의 자식으로 한다.
        }
    }
    // boxList = document.getElementsByClassName("box")
    // shuffle(cards);

    // for (var index = 0; index < cards.length; index++) {
    //     boxList[index].innerHTML = cards[index]
    // }

    // console.log(cards)
}


// 변수이름, enter! --> 코드를 깔끔하게! , 내가 오늘 이 코드를 처음 봤다했을 때 이해 가능한가? + 고객이 봤을 때 이 프로그램이 편한가?
// innerHTML는 태그에 붙어서 작동한다.

// 이건 그냥 당구공
var images = ["ball_1.png", "ball_2.png", "ball_3.png", "ball_4.png", "ball_5.png", "ball_6.png", "ball_7.png", "ball_8.png", "ball_9.png"];
function random_ball() {
    // shuffle(images);
    for (var index = 0; index < images.length; index++) {
        var chosenImage = images[index];  //2. 배열 요소들이 랜덤하게 반환되는 chosenImage 라는 변수를 만든다.
        var tmpImage = document.createElement("img");
        //3.createElement() 를 통해 img태그 모습을 가진 코드의 tmpImage 라는 변수를 만든다.--> img라는 태그를 생성한다.
        tmpImage.src = `Week4_H_img/${chosenImage}`;  //4. 즉 HTML에서 img태그를 작성하듯이 모습을 똑같이 만들어준다.
        tmpImage.className = "ball_images";   // ball_images라는 클래스 만든다.
        tmpImage.draggable = true;
        tmpImage.id = index;
        tmpImage.addEventListener("dragstart", function (event) { dragStartEvent(event) })
        tmpImage.addEventListener("dragover", function (event) { dragOverEvent(event) })
        tmpImage.addEventListener("drop", function (event) { dropEvent(event) })
        document.getElementById("ball").appendChild(tmpImage); //img라는 태그를 card의 자식으로 한다.
        console.log(tmpImage);

    }
} 
