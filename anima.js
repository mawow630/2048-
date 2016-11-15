/**
 * Created by Administrator on 2016/11/3.
 */
function showNumber( i , j , number ){
    var move_item = $('#move_square' + i + j );
    move_item.css('background-color',getBackgroundColor( number ) );
    move_item.css('color',getNumberColor( number ) );
    move_item.text( number );
    move_item.animate({
        width:"100px",
        height:"100px",
        top:getTop( i , j ),
        left:getLeft( i , j )
    },50);

}
function showMove(formx,formy,tox,toy) {
    var move_item = $('#move_square' + formx + formy );
    move_item.animate({
        top:getTop( tox , toy ),
        left:getLeft( tox , toy )
    },200);
}


