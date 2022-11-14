        const lift = document.getElementById("lift");
        const liftText = document.getElementById("usedLiftAndText");
        const floor = document.getElementById("floor");
        const result = document.getElementById("result");
        const moveUpBtn = document.getElementById("moveUpBtn");
        const moveDownBtn = document.getElementById("moveDownBtn");
        const goBtn = document.getElementById("goBtn");
        const input1 = document.querySelector("#input");

        let toFloor = 0;
        let onMotion = false;
        let motion = null;

        window.addEventListener("DOMContentLoaded", ()=>{
            onMotion = false;
            // motion = setInterval(animateUp, 50);

            // when the moveUpBtn is clicked
            moveUpBtn.addEventListener("click", ()=>{
                let y = liftText.getAttribute("y");
                if(onMotion == true){
                    result.innerText = "lift on  motion. wait until the lift is at rest";
                }else{
                    onMotion = true;
                    motion = setInterval(animateUp, 50);
                }
            })

          

            // when the moveDownBtn is clicked
            moveDownBtn.addEventListener("click", ()=>{
                let y = liftText.getAttribute("y");
                if(onMotion == true){
                    result.innerText = "lift on  motion. wait until the lift is at rest";
                }else{
                    onMotion = true;
                    motion = setInterval(animateDown, 50);
                }
            })

            // when the goBtn is clicked
            goBtn.addEventListener("click", ()=>{
                let floor = parseInt(input1.value);
                if(floor === 10){floor = 1;}
                else if(floor === 8){floor = 3;}
                else if(floor === 7){floor = 4;}
                else if(floor === 6){floor = 5;}
                else if(floor === 9){floor = 2;}
                else if(floor === 5){floor = 6;}
                else if(floor === 4){floor = 7;}
                else if(floor === 3){floor = 8;}
                else if(floor === 2){floor = 9;}
                else if(floor === 1){floor = 10;}
                

                if(floor > 10) {
                    result.innerText = "Room not found";
                }
                else if(floor === 0){
                    result.innerText = "No such room";
                }else{
                    let y = liftText.getAttribute("y");
                    toFloor = (floor)*50 - 50;
                    if(onMotion == true){
                        result.innerText = "lift on motion";
                    }else{
                        onMotion = true;
                        motion = setInterval(animateTo, 50);
                    }
                }
             
            })
        })

          //taking input
          function Display(num){
            input.value += num
        }

        //clear button
        function Clear(){
            input.value = "";
        }

        // function to animate the lift when the goBtn is clicked
        const animateTo = () => {
            let y = parseInt(liftText.getAttribute("y"));
            let newY = 0;
            if(toFloor > y){
                newY = parseInt(y) + 1;
            }else{
                newY = parseInt(y) - 1;
            }
            console.log(`new y is ${newY}`);

            if(newY == toFloor) {
                let floorNum = (newY +50)/50;
                // set the floo number using the setFloor function
                setFloor(floorNum);
                onMotion = false;
                result.innerText = "lift at rest";
                clearInterval(motion);
                motion = null;
                lift.style.fill = "green";
            }else{
                lift.style.fill = "#75139e";
                result.innerText = "lift in motion";
                // setting the floor number and showing the green color/light
                if((newY + 50)%50 == 0 ){
                    lift.style.fill = "green";
                }else{
                    lift.style.fill = "#75139e";
                }

                let floorNum = (newY+50)/50;
                // use setFloor function to set the floor number
                setFloor(floorNum);
                // change the y attribute of svg element g which has a rect and text
                liftText.setAttribute("y", newY);

            }
        }

        // function to animate the lift up. It reduces the y element then pass it to the animate function
        const animateUp = ()=>{
            let y = liftText.getAttribute("y");
            let newY = parseInt(y) - 1;
            animate(newY);
        }

        // function to animate the lift down. It reduces the y element then pass it to the animate function
        const animateDown = ()=>{
            let y = liftText.getAttribute("y");
            let newY = parseInt(y) + 1;
            animate(newY);
        }

        // function to animate the lift up or down. itr changes the y attribute of the lift
        const animate = newY => {
            if(newY > 450) {
                onMotion = false;
                result.innerText = "lift is down";
                clearInterval(motion); //todo
                motion = null;
            }else if(newY < 0){
                onMotion = false;
                result.innerText = "lift is up";
                clearInterval(motion); //todo
                motion = null;
            }else{
                result.innerText = "lift on motion";
                // setting the floor number and showing the green color/light
                if((newY + 50)%50 == 0 ){
                    lift.style.fill = "green";
                }else{
                    lift.style.fill = "#75139e";
                }

                let floorNum = (newY+50)/50;
                // use setFloor function to set the floor number
                setFloor(floorNum);
                // change the y attribute of svg element g which has a rect and text
                liftText.setAttribute("y", newY);
            }
        }

        // function to set the floor number text when the lift is in motion
        const setFloor = floorNum => {
            switch (floorNum) {
                case 1:
                    floor.textContent = "10";
                    break;
                case 2:
                    floor.textContent = "9";
                    break;
                case 3:
                    floor.textContent = "8";
                    break;
                case 4:
                    floor.textContent = "7";
                    break;
                case 5:
                    floor.textContent = "6";
                    break;
                case 6:
                    floor.textContent = "5";
                    break;
                case 7:
                    floor.textContent = "4";
                    break;
                case 8:
                    floor.textContent = "3";
                    break;
                case 9:
                    floor.textContent = "2";
                    break;
                case 10:
                    floor.textContent = "1";
                    break;
                default:
                    floor.textContent = "";
                    break;
            }
        }
