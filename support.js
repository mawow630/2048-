/**
 * Created by Administrator on 2016/11/3.
 */
function getBackgroundColor(number) {
    switch (number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}
function getNumberColor(number) {
    if( number <= 4 ) {
        return "#776e65";
    }else {
        return "#fff"
    }
}
function noSpace(number_save) {
    for(var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            if(number_save[i][j]==0){
                return false
            }
        }
    }
    return true
}
function noMove(number_save) {
    if(canDown(number_save)||canUp(number_save)||canLeft(number_save)||canRight(number_save)){
        return false
    }else {
        return true
    }
}

function getTop(i,j) {
    var top=$("#square"+i+j).position().top;
    // $("#move_square"+i+j).css("top",top);
    return top
}
function getLeft(i,j) {
    var left=$("#square"+i+j).position().left;
    // $("#move_square"+i+j).css("left",left);
    return left
}
function noBlockX(row,col1,col2,number_save){
    for(var i=col1+1;i<col2;i++){
        if(number_save[row][i]!=0){
            return false;
        }
    }
    return true
}
function noBlockY(col,row1,row2,number_save){
    for(var i=row1+1; i<row2; i++ )
        if(number_save[i][col]!=0)
            return false;
    return true;
}

function moveLeft() {
    if(!canLeft(number_save)){
        return false
    }else {
        for (var i=0;i<4;i++) {
            for (var j = 1; j < 4; j++) {
                if(number_save[i][j]!=0){
                    for(var k=0;k<j;k++)
                        if(number_save[i][k]==0&&noBlockX(i,k,j,number_save)){
                            showMove(i,j,i,k);
                            number_save[i][k]=number_save[i][j];
                            number_save[i][j]=0;
                            continue;
                            }else if(number_save[i][k]==number_save[i][j]&&noBlockX(i,k,j,number_save)&&!has_add[i][k]){
                            has_add[i][k]=true;
                            showMove(i,j,i,k);
                            number_save[i][k]+=number_save[i][j];
                            number_save[i][j]=0;
                            score+=number_save[i][k];
                            upScore(score);
                            continue;
                        }
                    }
                }
            }
        setTimeout("updateView()",200);
        return true
    }
}
function canLeft(number_save) {
    for (var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(number_save[i][j]!=0){
                if(number_save[i][j-1]==0||number_save[i][j-1]==number_save[i][j]){
                    return true
                }
            }
        }
    }
    return false
}


function moveRight() {
    if(!canRight(number_save)) {
        return false
    }else {
        for (var i=0;i<4;i++) {
            for (var j = 2; j >= 0 ; j --) {
                if(number_save[i][j]!=0){
                    for(var k = 3 ; k > j ; k --)
                        if(number_save[i][k]==0&&noBlockX(i,j,k,number_save)){
                            showMove(i,j,i,k);
                            number_save[i][k]=number_save[i][j];
                            number_save[i][j]=0;
                            continue;
                        }else if(number_save[i][k]==number_save[i][j]&&noBlockX(i,j,k,number_save)&&!has_add[i][k]){
                            has_add[i][k]=true;
                            showMove(i,j,i,k);
                            number_save[i][k]+=number_save[i][j];
                            number_save[i][j]=0;
                            score+=number_save[i][k];
                            upScore(score);
                            continue;
                        }
                }
            }
        }
        setTimeout("updateView()",200);
        return true
    }
}
function canRight(number_save) {
    for (var i=0;i<4;i++){
        for(var j = 2; j >= 0 ; j --){
            if(number_save[i][j]!=0){
                if(number_save[i][j+1]==0||number_save[i][j+1]==number_save[i][j]){
                    return true
                }
            }
        }
    }
    return false
}

function moveDown() {
    if(!canDown(number_save)) {
        return false
    }else {
        for (var j = 0 ; j < 4 ; j ++) {
            for ( var i = 2 ; i >= 0 ; i -- ) {
                if(number_save[i][j]!=0){
                    for(var k = 3 ; k > i ; k --)
                        if(number_save[k][j]==0&&noBlockY(j,i,k,number_save)){
                            showMove(i,j,k,j);
                            number_save[k][j]=number_save[i][j];
                            number_save[i][j]=0;
                            continue;
                        }else if(number_save[k][j]==number_save[i][j]&&noBlockY(j,i,k,number_save)&&!has_add[k][j]){
                            has_add[k][j]=true;
                            showMove(i,j,k,j);
                            number_save[k][j]+=number_save[i][j];
                            number_save[i][j]=0;
                            score+=number_save[k][j];
                            upScore(score);
                            continue;
                        }
                }
            }
        }
        setTimeout("updateView()",200);
        return true
    }
}
function canDown(number_save) {
    for (var j=0;j<4;j++){
        for(var i = 2; i >= 0 ; i --){
            if(number_save[i][j]!=0){
                if(number_save[i+1][j]==0||number_save[i+1][j]==number_save[i][j]){
                    return true
                }
            }
        }
    }
    return false
}

function moveUp() {
    if(!canUp(number_save)) {
        return false
    }else {
        for (var j = 0 ; j < 4 ; j ++) {
            for ( var i = 1 ; i<4 ; i ++ ) {
                if(number_save[i][j]!=0){
                    for(var k = 0 ; k < i ; k ++)
                        if(number_save[k][j]==0&&noBlockY(j,k,i,number_save)){
                            showMove(i,j,k,j);
                            number_save[k][j]=number_save[i][j];
                            number_save[i][j]=0;
                            continue;
                        }else if(number_save[k][j]==number_save[i][j]&&noBlockY(j,k,i,number_save)&&!has_add[k][j]){
                            has_add[k][j]=true;
                            showMove(i,j,k,j);
                            number_save[k][j]+=number_save[i][j];
                            number_save[i][j]=0;
                            score+=number_save[k][j];
                            upScore(score);
                            continue;
                        }
                }
            }
        }
        setTimeout("updateView()",200);
        return true
    }
}
function canUp(number_save) {
    for (var j=0;j<4;j++){
        for(var i = 1; i < 4 ; i ++){
            if(number_save[i][j]!=0){
                if(number_save[i-1][j]==0||number_save[i-1][j]==number_save[i][j]){
                    return true
                }
            }
        }
    }
    return false
}

function upScore(score){
    $('#score').text( score );
}
function over() {
    if(noSpace(number_save)&&noMove(number_save)){
        document.getElementById("gameover").setAttribute("display","block");
        alert("over");
    }
}

