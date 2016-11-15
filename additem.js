/**
 * Created by Administrator on 2016/11/3.
 */
$(document).ready(function () {
    newGame();
});

var score = 0;
var number_save=new Array;
var has_add=new Array;
// 开始游戏
function newGame() {
// 初始化数字记录数组
    for(var i=0;i<4;i++){
        number_save[i]=new Array;
        has_add[i]=new Array;
        for(var j=0;j<4;j++){
            number_save[i][j]=0;
            has_add[i][j]=false;
        }
    }
    updateView();
    $('#score').text( 0 );
    addOneNumber();
    addOneNumber();
}

// 初始化视图
function updateView() {
    // 移除所有可移动方块
    $(".move_item").remove();
    // 添加可移动方块
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#square").append('<div class="move_item" id="move_square'+i+j+'"></div>');
            var move_item = $("#move_square" + i + j);
            // 如果当前格子上没有方块，CSS控制显示
            if (number_save[i][j] == 0) {
                move_item.css('width', '0px');
                move_item.css('height', '0px');
                move_item.css('top',getTop(i,j)+50);
                move_item.css('left',getLeft(i,j)+50);
                // location(i,j);
            }
            // 如果当前格子上有方块，CSS控制显示
            else {
                move_item.css('width', '100px');
                move_item.css('height', '100px');
                // location(i,j);
                move_item.css('top',getTop(i,j));
                move_item.css('left',getLeft(i,j));
                move_item.css('background-color', getBackgroundColor(number_save[i][j]));
                move_item.css('color', getNumberColor(number_save[i][j]));
                move_item.text(number_save[i][j]);
            }
            has_add[i][j]=false;
        }
}

function addOneNumber() {
    if(noSpace(number_save)){
        return false
    }else {
        var rollx = parseInt(Math.floor(Math.random() * 4));
        var rolly = parseInt(Math.floor(Math.random() * 4));
        while (true) {
            if(number_save[rollx][rolly]===0){
                break;
            }else {
                 rollx = parseInt(Math.floor(Math.random() * 4));
                 rolly = parseInt(Math.floor(Math.random() * 4));
            }
        }
        var roll_num=Math.random()< 0.5 ? 2 : 4;
        number_save[rollx][rolly]=roll_num;
        // 在这位置出现
        showNumber([rollx],[rolly],roll_num);
        return true
    }
}

$(document).keydown(function (event) {
   switch (event.keyCode){
       case 37://left
           if(moveLeft()){
               setTimeout("addOneNumber()",210);
               setTimeout("over()",300);
           }
           break;
       case 38://up
           if(moveUp()){
               setTimeout("addOneNumber()",210);
               setTimeout("over()",300);
           }
           break;
       case 39://right
           if(moveRight()){
               setTimeout("addOneNumber()",210);
               setTimeout("over()",300);
           }
           break;
       case 40://down
           if(moveDown()){
               setTimeout("addOneNumber()",210);
               setTimeout("over()",300);
           }
           break;
       default:
           break;
   }
});