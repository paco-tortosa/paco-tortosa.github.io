let strEnglishLesson    =   "";
let oEnglishLesson      =   undefined;
let strEspanishLesson   =   "";
let oSpanishLesson      =   undefined;
let strLesson           =   "Hi";
let strES_EN            =   "EN";

function fLoadLesson( response, status, xhr ) {
    if ( status == "error" ) {
        if( strES_EN == "ES" )
        {
            $('.lesson').load( './_cursos/00_Web/Lesson_404/404_ES.html' );
        }
        else
        {
            $('.lesson').load('./_cursos/00_Web/Lesson_404/404_EN.html');
        }
    }
}
  
//Event 'onload'
$(() => {
    // $('h1').addClass('cRed')
    console.log("Starting ...");

    //Registering events
    $('.icon-section.minus').on('click', function () {
        $(this).siblings('.icon-section').show();
        $(this).parent().parent().children('.node-lesson').hide();
        $(this).hide();

        onTreeResize( 0 );
    });

    //Registering events
    $('.icon-section.plus').on('click', function () {
        $(this).siblings('.icon-section').show();
        $(this).parent().parent().children('.node-lesson').css('display','flex');   //Show -> display block
        $(this).hide();

        onTreeResize( 0 );
    });

    //Registering events
    $('.icon-course.minus').on('click', function () {
        $(this).siblings('.icon-course').show();
        $(this).parent().parent().children('.node-section').hide();
        $(this).hide();

        onTreeResize( 0 );
    });

    //Registering events
    $('.icon-course.plus').on('click', function () {
        $(this).siblings('.icon-course').show();
        $(this).parent().parent().children('.node-section').show();
        $(this).hide();

        onTreeResize( 0 );
    });

    //Registering events
    $('.btn-language-en').on('click', function () {
        $('.course-name-es').hide();
        $('.course-name-en').show();
        $('.section-name-es').hide();
        $('.section-name-en').show();
        $('.lesson-name-es').hide();
        $('.lesson-name-en').show();
        if( oEnglishLesson !== undefined ) {
            oEnglishLesson.addClass('shown');
        }
        $('.btn-language-en').removeClass('not-selected');
        $('.btn-language-es').addClass('not-selected');
        $('.lesson').load( strEnglishLesson , fLoadLesson );
        strLesson   =   strEnglishLesson;

        strES_EN    =   "EN";
        onTreeResize( 0 );
    });

    //Registering events
    $('.btn-language-es').on('click', function () {
        $('.course-name-en').hide();
        $('.course-name-es').show();
        $('.section-name-en').hide();
        $('.section-name-es').show();
        $('.lesson-name-en').hide();
        $('.lesson-name-es').show();
        if( oSpanishLesson !== undefined ) {
            oSpanishLesson.addClass('shown');
        }
        $('.btn-language-es').removeClass('not-selected');
        $('.btn-language-en').addClass('not-selected');
        $('.lesson').load( strSpanishLesson , fLoadLesson );
        strLesson   =   strSpanishLesson;

        strES_EN    =   "ES";
        onTreeResize( 0 );
    });

    //Registering events
    $('.lesson-name-es').on('click', function () {
        if( $(this).hasClass("shown") ){
            return;
        }
        strEnglishLesson    =   $(this).siblings('.lesson-name-en').attr('lesson-2-show');
        oEnglishLesson      =   $(this).siblings('.lesson-name-en');
        strSpanishLesson    =   $(this).attr('lesson-2-show');
        oSpanishLesson      =   $(this);
        strLesson           =   strSpanishLesson;
        $('.lesson').load( strLesson , fLoadLesson );
        $('.lesson-name-es').removeClass('shown');
        $('.lesson-name-en').removeClass('shown');
        $(this).addClass('shown');
        $('html, body').animate({scrollTop: '0px'}, 300);
    });

    //Registering events
    $('.lesson-name-en').on('click', function () {
        if( $(this).hasClass("shown") ){
            return;
        }
        strEnglishLesson    =   $(this).attr('lesson-2-show');
        oEnglishLesson      =   $(this);
        strSpanishLesson    =   $(this).siblings('.lesson-name-es').attr('lesson-2-show');
        oSpanishLesson      =   $(this).siblings('.lesson-name-es');
        strLesson           =   strEnglishLesson;
        $('.lesson').load( strLesson , fLoadLesson );
        $('.lesson-name-es').removeClass('shown');
        $('.lesson-name-en').removeClass('shown');
        $(this).addClass('shown');
        $('html, body').animate({scrollTop: '0px'}, 300);
    });

    // ===== Scroll to Top ==== 
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
            $('.btnGoToTop').fadeIn(500);       // Fade in the arrow
        } else {
            $('.btnGoToTop').fadeOut(500);      // Else fade out the arrow
        }
    });
    $('.btnGoToTop').click(function() {         // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });

    $('.tree-frame').bind('DOMMouseScroll mousewheel', function (e) {
        let wheelDelta          =   e.originalEvent.wheelDelta;
        if( wheelDelta === undefined )
        {
            //FireFox
            wheelDelta          =   - e.originalEvent.detail;
        }

        if( wheelDelta > 0 ) {
            //Scrolling up
            onTreeResize( 20 );
        }
        else{
            //Scrolling down
            onTreeResize( -20 );
        }        

        //Cancel propagation of scroll to lesson div
        e.preventDefault();
    });

    function onTreeResize( _vTreeTopDelta )
    {
        //Compare tree content to tree frame
        let vTreeFrameHeight    =   $(".tree-frame").css("height");
        vTreeFrameHeight        =   parseInt(vTreeFrameHeight);
        let vTreeContentHeight  =   $(".tree-content").css("height");
        vTreeContentHeight      =   parseInt(vTreeContentHeight);
        if( vTreeContentHeight <= vTreeFrameHeight )
        {
            //Not needed the scroll-bar
            $('.scroll').hide();
            $(".tree-content").css("top",'0px');
            return;
        }

        //Check limits of vTreeTop
        let vTreeTop            =   parseInt( $(".tree-content").css("top") );
        vTreeTop                +=  _vTreeTopDelta;
        if( vTreeTop > 0 )
        {
            vTreeTop            =   0;
        }
        else if( vTreeContentHeight + vTreeTop <= vTreeFrameHeight )
        {
            //Reached the bottom
            vTreeTop            =   vTreeFrameHeight - vTreeContentHeight;
        }
        $(".tree-content").css("top",vTreeTop + 'px');

        //Height of scroll-bar
        let vPercentageVisible      =   vTreeFrameHeight / vTreeContentHeight;
        let vScrollBarH             =   vPercentageVisible * vTreeFrameHeight;

        //Top of scroll-bar
        let vLengthHidden           =   vTreeContentHeight - vTreeFrameHeight;
        let vPercentageTopHidden    =   vTreeTop / vLengthHidden;
        let vScrollBarTop           =   - vPercentageTopHidden * ( vTreeFrameHeight - vScrollBarH );

        //Margins for the scroll-bar
        if( vScrollBarTop == 0 )
        {
            vScrollBarTop           =   1;
        }
        vScrollBarH                 -=  2;

        $('.scroll').show();
        $('.scroll-bar').css('top'      ,vScrollBarTop + 'px');
        $('.scroll-bar').css('height'   ,vScrollBarH + 'px');
    }

    $(window).on('resize', function(){
        onTreeResize( 0 );
    });

    let vScrollBarDragging          =   false;
    let vScrollBarDraggingPositionY =   undefined;
    $('.scroll-bar').mousedown(function () {
        $(this).addClass('dragging');
        vScrollBarDragging  =   true;
    });
    $('*').mouseup(function () {
        $('.scroll-bar').removeClass('dragging');
        vScrollBarDraggingPositionY =   undefined;
        vScrollBarDragging          =   false;
    });
    $('*').mousemove(function (e) {
        if( ! vScrollBarDragging )
        {
            return;
        }
        if( vScrollBarDraggingPositionY === undefined )
        {
            vScrollBarDraggingPositionY =   e.clientY;
            return;
        }
        let vTreeFrameHeight        =   $(".tree-frame").css("height");
        vTreeFrameHeight            =   parseInt(vTreeFrameHeight);
        let vTreeContentHeight      =   $(".tree-content").css("height");
        vTreeContentHeight          =   parseInt(vTreeContentHeight);
        let vProportion             =   vTreeContentHeight / vTreeFrameHeight;
        let vPixelDelta             =   vScrollBarDraggingPositionY - e.clientY;
        onTreeResize( vPixelDelta * vProportion );
        vScrollBarDraggingPositionY =   e.clientY;
    });
    

    strEnglishLesson        =   './_cursos/00_Web/HomePage/00_EN.html';
    strSpanishLesson        =   './_cursos/00_Web/HomePage/00_ES.html';
    strLesson               =   strEnglishLesson;
    $('.lesson').load( strLesson , fLoadLesson );

    onTreeResize( 0 );

    //Argumentos de la pagina web
    //https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript
    var params={};
    window.location.search
      .replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
        params[key] = value;
      }
    );
    if( params["course"] !== undefined ) {
        $( "#icplus-" + params["course"] ).trigger( "click" );
        //alert("Parametro setcourse = " + params["course"] );
    }      
    
    //Estamos en desarrollo
    if( window.location.origin.indexOf("localhost") >= 0 ) {
        console.log(window.location.origin);
        console.log("Estamos en desarrollo");

        //Registering events
        $('.btnReload').on('click', function () {
            $('.lesson').load( strLesson , fLoadLesson );
        });
        $('.btnReload').show();

        //Para contenido dinámico :
        //stackoverflow.com/questions/42644949/why-is-jquery-on-click-event-handler-not-working-properly-for-dynamic-loaded-dom
        $(document).on("click",".b1,.b2,.b3,.b4,.b5,.b6",function () {
            // console.log( $(this).text() );

            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(this).text()).select();
            document.execCommand("copy");
            $temp.remove();
        });
    }
    else {
        $('.btnReload').hide();
    }
}); 
