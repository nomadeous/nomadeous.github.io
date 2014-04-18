

/*============================================
	Navbar Scrolling
	==============================================*/
/*var $doc = $(document),
$header = $('header');

$doc.on('scroll', function() {
  var percent = Math.max(0, Math.min(100, $doc.scrollTop())) / 100
      currentOpacity = 1 * percent,
      currentShadow = -5 + 7 * percent
      $header.css('background', 'rgba(255,255,255,' + currentOpacity + ')').css('box-shadow', '0 ' + currentShadow + 'px 2px #E6E6E6')
})*/

$(document).ready(function() {
    /*============================================
	Sequence Slider
	==============================================*/
	var sequenceOptions = {
        autoPlay: true,
        autoPlayDelay: 5000,
        pauseOnHover: false,
        hidePreloaderDelay: 500,
        nextButton: true,
        prevButton: true,
        pauseButton: true,
        preloader: false,
        hidePreloaderUsingCSS: true,                   
        animateStartingFrameIn: true,    
        navigationSkipThreshold: 750,
        preventDelayWhenReversingAnimations: true,
        customKeyEvents: {
            80: "pause"
        }
    };
    var sequence = $("#sequence").sequence(sequenceOptions).data("sequence");
	/*
	sequence.afterLoaded = function(){
		$('#sequence').delay(1000).animate({'opacity':1});
		
		setTimeout(function(){
			$("#sequence h2").fitText(0.9, { minFontSize: '24px', maxFontSize: '56px' });
			$("#sequence p").fitText(1.2, { minFontSize: '16px', maxFontSize: '28px' });
		},500);
	};*/
    /*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
		scrollSpyRefresh();
	});
	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}
    
    function format(item) { return item.id; }
    
    $('#types-selection').select2({
        data:{ results: typesRef.types}});
    
    $('#brands-selection').select2({
        data:{ results: brandsRef.brands, text: 'id' },
        formatSelection: format,
        formatResult: format
    });
    
    function loadBrandsTables() {
        var divTables = $('#brands-list');
        var brands = brandsRef.brands;
        var nbByLines = 3;
        var nbInLine = 0;
        var previousLetter = "";
        var previousTable = false;
        var html = "";
        var letters = new Array();
        
        for(i=0;i<brands.length;i++) {
            var brand = brands[i].id;
            if(previousLetter != brand.substring(0,1)) {
                if(previousTable) {
                    html+= '</tbody></table>';
                }
                previousTable = true;
                var newLetter= brand.substring(0,1);
                html+= '<table class="table table-striped" id="brands-letter-'+newLetter+'">';
                html+= '<thead><tr><th colspan="'+(nbByLines-1)+'">'+newLetter+' </th><th class="text-right"><a href="#brands" class="scrollto"><i class="fa fa-arrow-up"></i></a></th></tr></thead><tbody>';
                previousLetter = newLetter;
                letters+= newLetter;
                nbInLine = 0;
            }
            nbInLine = nbInLine+1;
            if(nbInLine == 1) {
                html+= '<tr>';
            }
            html+= '<td>'+brand+'</td>';
            
            if(nbInLine >= nbByLines) {
                html+= '</tr>';
                nbInLine = 0;
            }
        }
        for(var j=letters.length-1;j>=0;j--) {
            html = '<a href="#brands-letter-'+letters[j]+'" class="scrollto">' + letters[j] + '</a> ' + html;
        }
        divTables.html(divTables.html() + html );
    }
    loadBrandsTables();
    
    /*============================================
	ScrollTo Links
	==============================================*/
    $('a.scrollto').click(function(e){
        $('html,body').scrollTo(this.hash, this.hash, {gap:{y:-90},animation:  {easing: 'easeInOutCubic', duration: 1000}});
        e.preventDefault();

        if ($('.navbar-collapse').hasClass('in')){
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });
});


/* BRANDS */

var typesRef = { types : [
    {"id" : "top", "text" : "un top"},
    {"id" : "pull", "text" : "un pull, un gilet"},
    {"id" : "jupe", "text" : "une jupe"},
    {"id" : "combinaison", "text" : "une combinaison"},
    {"id" : "robe", "text" : "une robe"},
    {"id" : "veste", "text" : "une veste"},
    {"id" : "blouson", "text" : "un blouson"},
    {"id" : "trench", "text" : "un trench, un imperméable"},
    {"id" : "manteau", "text" : "un manteau"},
]};


var brandsRef = { brands : [
{"id" : "3.1 PHILLIP LIM","gamme":"Tendance"},
{"id" : "7 FOR ALL MANKIND","gamme":"Tendance"},
{"id" : "ACNE","gamme":"Haut de gamme"},
{"id" : "AGNÈS B.","gamme":"Tendance"},
{"id" : "AMERICAN RETRO","gamme":"Tendance"},
{"id" : "AMERICAN VINTAGE","gamme":"Tendance"},
{"id" : "ANN DEMEULEMEESTER","gamme":"Haut de gamme"},
{"id" : "ANTIK BATIK","gamme":"Tendance"},
{"id" : "APC","gamme":"Tendance"},
{"id" : "APOSTROPHE","gamme":"Tendance"},
{"id" : "APRIL MAY","gamme":"Tendance"},
{"id" : "Abercrombie & Fitch","gamme":"Grand public"},
{"id" : "BALENCIAGA","gamme":"Haut de gamme"},
{"id" : "BALMAIN","gamme":"Haut de gamme"},
{"id" : "BANANA REPUBLIC","gamme":"Grand public"},
{"id" : "BARBARA BUI","gamme":"Haut de gamme"},
{"id" : "BASH","gamme":"Tendance"},
{"id" : "BCBG MAX AZRIA","gamme":"Tendance"},
{"id" : "BEL AIR","gamme":"Tendance"},
{"id" : "BELLEROSE","gamme":"Tendance"},
{"id" : "BELSTAFF","gamme":"Tendance"},
{"id" : "BIMBA & LOLA","gamme":"Tendance"},
{"id" : "BOUCHRA JARRAR","gamme":"Haut de gamme"},
{"id" : "BRUNELLO CUCINELLI","gamme":"Tendance"},
{"id" : "BRUUNS BAZAAR","gamme":"Tendance"},
{"id" : "BURBERRY BRIT","gamme":"Tendance"},
{"id" : "BURBERRY LONDON","gamme":"Haut de gamme"},
{"id" : "BURBERRY PRORSUM","gamme":"Haut de gamme"},
{"id" : "BY MALENE BIRGER","gamme":"Tendance"},
{"id" : "BY ZOE","gamme":"Tendance"},
{"id" : "CACHAREL","gamme":"Tendance"},
{"id" : "CALLA","gamme":"Tendance"},
{"id" : "CANADA GOOSE","gamme":"Tendance"},
{"id" : "CARVEN","gamme":"Haut de gamme"},
{"id" : "CATHERINE MALANDRINO","gamme":"Tendance"},
{"id" : "CELINE","gamme":"Haut de gamme"},
{"id" : "CHANEL","gamme":"Haut de gamme"},
{"id" : "CHEAP MONDAY","gamme":"Grand public"},
{"id" : "CHLOÉ","gamme":"Haut de gamme"},
{"id" : "CHRISTINE PHUNG","gamme":"Haut de gamme"},
{"id" : "CHRISTIAN DIOR","gamme":"Haut de gamme"},
{"id" : "CHRISTIAN LACROIX","gamme":"Haut de gamme"},
{"id" : "CHRISTOPHE LEMAIRE","gamme":"Haut de gamme"},
{"id" : "CIRCUS & CO","gamme":"Grand public"},
{"id" : "CLAUDIE PIERLOT","gamme":"Tendance"},
{"id" : "CLUB MONACO","gamme":"Grand public"},
{"id" : "COMME DES GARCONS","gamme":"Haut de gamme"},
{"id" : "COMPTOIR DES COTONNIERS","gamme":"Grand public"},
{"id" : "COP COPINE","gamme":"Grand public"},
{"id" : "COS","gamme":"Grand public"},
{"id" : "COTÉLAC","gamme":"Tendance"},
{"id" : "COURREGES","gamme":"Haut de gamme"},
{"id" : "CULTURE VINTAGE","gamme":"Grand public"},
{"id" : "D&G","gamme":"Tendance"},
{"id" : "DES PETITS HAUTS","gamme":"Grand public"},
{"id" : "DIANE VON FURSTENBERG","gamme":"Tendance"},
{"id" : "DIESEL","gamme":"Grand public"},
{"id" : "DIOR","gamme":"Haut de gamme"},
{"id" : "DKNY","gamme":"Grand public"},
{"id" : "DOLCE & GABBANA","gamme":"Haut de gamme"},
{"id" : "DONNA KARAN","gamme":"Tendance"},
{"id" : "DRIES VAN NOTEN","gamme":"Haut de gamme"},
{"id" : "EKYOG  - hors pièces basiques","gamme":"Grand public"},
{"id" : "EQUIPMENT","gamme":"Tendance"},
{"id" : "ERIC BOMPARD","gamme":"Tendance"},
{"id" : "EROTOKRITOS","gamme":"Tendance"},
{"id" : "ESCADA","gamme":"Haut de gamme"},
{"id" : "ET VOUS","gamme":"Grand public"},
{"id" : "ETRO","gamme":"Haut de gamme"},
{"id" : "FRENCH CONNECTION","gamme":"Grand public"},
{"id" : "GAT RIMON","gamme":"Tendance"},
{"id" : "GERARD DAREL","gamme":"Tendance"},
{"id" : "GIANNI VERSACE","gamme":"Haut de gamme"},
{"id" : "GIVENCHY","gamme":"Haut de gamme"},
{"id" : "GUCCI","gamme":"Haut de gamme"},
{"id" : "HARTFORD","gamme":"Tendance"},
{"id" : "HEIMSTONE","gamme":"Tendance"},
{"id" : "HERMÈS","gamme":"Haut de gamme"},
{"id" : "HERVE LEGER","gamme":"Haut de gamme"},
{"id" : "HOGAN","gamme":"Haut de gamme"},
{"id" : "HUGO BOSS","gamme":"Tendance"},
{"id" : "IKKS","gamme":"Tendance"},
{"id" : "IRENE VAN RYB","gamme":"Tendance"},
{"id" : "IRIÉ","gamme":"Tendance"},
{"id" : "IRO","gamme":"Tendance"},
{"id" : "ISABEL MARANT","gamme":"Haut de gamme"},
{"id" : "ISABEL MARANT ETOILE","gamme":"Tendance"},
{"id" : "ISSEY MIYAKE","gamme":"Haut de gamme"},
{"id" : "JAY AHR","gamme":"Haut de gamme"},
{"id" : "JEAN PAUL GAULTIER","gamme":"Haut de gamme"},
{"id" : "JIL SANDER","gamme":"Haut de gamme"},
{"id" : "JOHN GALLIANO","gamme":"Haut de gamme"},
{"id" : "JOOP!","gamme":"Tendance"},
{"id" : "JOSEPH","gamme":"Tendance"},
{"id" : "JUNYA WATANABE","gamme":"Haut de gamme"},
{"id" : "JUST CAVALLI","gamme":"Haut de gamme"},
{"id" : "KAREN MILLEN","gamme":"Tendance"},
{"id" : "KARL LAGERFELD","gamme":"Haut de gamme"},
{"id" : "KENNETH COLE","gamme":"Tendance"},
{"id" : "KENZO","gamme":"Haut de gamme"},
{"id" : "KITSUNE","gamme":"Tendance"},
{"id" : "LACOSTE","gamme":"Grand public"},
{"id" : "LANVIN","gamme":"Haut de gamme"},
{"id" : "LAURENCE DOLIGE","gamme":"Tendance"},
{"id" : "LE MONT SAINT MICHEL","gamme":"Tendance"},
{"id" : "LE PETIT LUCAS DU TERTRE","gamme":"Tendance"},
{"id" : "LEONARD","gamme":"Haut de gamme"},
{"id" : "LES PETITES","gamme":"Tendance"},
{"id" : "LOLA","gamme":"Tendance"},
{"id" : "LOUIS VUITTON","gamme":"Haut de gamme"},
{"id" : "MADAME A PARIS","gamme":"Tendance"},
{"id" : "MADELEINE THOMPSON","gamme":"Tendance"},
{"id" : "MADEMOISELLE TARA","gamme":"Grand public"},
{"id" : "MAISON MARTIN MARGIELA","gamme":"Haut de gamme"},
{"id" : "MAISON OLGA","gamme":"Tendance"},
{"id" : "MAJE","gamme":"Tendance"},
{"id" : "MANOUSH","gamme":"Tendance"},
{"id" : "MARC BY MARC JACOBS","gamme":"Tendance"},
{"id" : "MARC JACOBS","gamme":"Haut de gamme"},
{"id" : "MARNI","gamme":"Haut de gamme"},
{"id" : "MAX MARA","gamme":"Haut de gamme"},
{"id" : "MCQ","gamme":"Haut de gamme"},
{"id" : "MISSONI","gamme":"Haut de gamme"},
{"id" : "MIU MIU","gamme":"Haut de gamme"},
{"id" : "MONCLER","gamme":"Haut de gamme"},
{"id" : "NINA RICCI","gamme":"Haut de gamme"},
{"id" : "OLYMPIA LE TAN","gamme":"Haut de gamme"},
{"id" : "PABLO DE GERARD DAREL","gamme":"Tendance"},
{"id" : "PARAJUMPERS","gamme":"Tendance"},
{"id" : "PATRIZIA PEPE","gamme":"Tendance"},
{"id" : "PAUL & JOE","gamme":"Tendance"},
{"id" : "PAUL & JOE SISTER","gamme":"Grand public"},
{"id" : "PAUL SMITH","gamme":"Haut de gamme"},
{"id" : "PAUL SMITH BLACK","gamme":"Haut de gamme"},
{"id" : "PAULE KA","gamme":"Tendance"},
{"id" : "PRADA","gamme":"Haut de gamme"},
{"id" : "PROENZA SCHOULER","gamme":"Haut de gamme"},
{"id" : "PYRENEX","gamme":"Tendance"},
{"id" : "RAF SIMONS","gamme":"Haut de gamme"},
{"id" : "RAG & BONE","gamme":"Tendance"},
{"id" : "RALPH LAUREN","gamme":"Tendance"},
{"id" : "RALPH LAUREN BLACK LABEL","gamme":"Tendance"},
{"id" : "RALPH LAUREN BLUE LABEL","gamme":"Tendance"},
{"id" : "RALPH LAUREN COLLECTION","gamme":"Tendance"},
{"id" : "RALPH LAUREN DENIM & SUPPLY","gamme":"Tendance"},
{"id" : "RALPH LAUREN DOUBLE RL","gamme":"Tendance"},
{"id" : "RALPH LAUREN SPORT","gamme":"Tendance"},
{"id" : "RED VALENTINO","gamme":"Haut de gamme"},
{"id" : "REISS","gamme":"Tendance"},
{"id" : "REPETTO","gamme":"Tendance"},
{"id" : "RICK OWENS","gamme":"Haut de gamme"},
{"id" : "ROBERTO CAVALLI","gamme":"Haut de gamme"},
{"id" : "RODIER","gamme":"Tendance"},
{"id" : "ROSEANNA","gamme":"Tendance"},
{"id" : "SAINT JAMES","gamme":"Grand public"},
{"id" : "SAINT LAURENT","gamme":"Haut de gamme"},
{"id" : "SANDRO","gamme":"Tendance"},
{"id" : "SCARLETT ROOS","gamme":"Grand public"},
{"id" : "SEE BY CHLOÉ","gamme":"Tendance"},
{"id" : "SESSUN","gamme":"Grand public"},
{"id" : "SONIA BY SONIA RYKIEL","gamme":"Tendance"},
{"id" : "SONIA RYKIEL","gamme":"Haut de gamme"},
{"id" : "SOPHIA KOKOSALAKI","gamme":"Haut de gamme"},
{"id" : "STELLA CADENTE","gamme":"Tendance"},
{"id" : "STELLA FOREST","gamme":"Tendance"},
{"id" : "STELLA MC CARTNEY","gamme":"Haut de gamme"},
{"id" : "SWILDENS","gamme":"Tendance"},
{"id" : "TARA JARMON","gamme":"Tendance"},
{"id" : "THE KOOPLES","gamme":"Tendance"},
{"id" : "THE KOOPLES SPORT","gamme":"Tendance"},
{"id" : "THOMSEN","gamme":"Tendance"},
{"id" : "TOM FORD","gamme":"Haut de gamme"},
{"id" : "TSUMORI CHISATO","gamme":"Haut de gamme"},
{"id" : "VALENTINO","gamme":"Haut de gamme"},
{"id" : "VANESSA BRUNO","gamme":"Haut de gamme"},
{"id" : "VANESSA BRUNO ATHE","gamme":"Tendance"},
{"id" : "VENTCOUVERT","gamme":"Tendance"},
{"id" : "VERA WANG","gamme":"Haut de gamme"},
{"id" : "VERONIQUE LEROY","gamme":"Tendance"},
{"id" : "VERSACE","gamme":"Haut de gamme"},
{"id" : "VINCE","gamme":"Tendance"},
{"id" : "VIONNET","gamme":"Haut de gamme"},
{"id" : "VIRGINIE CASTAWAY","gamme":"Tendance"},
{"id" : "VIVIENNE WESTWOOD","gamme":"Haut de gamme"},
{"id" : "VIVIENNE WESTWOOD RED LABEL","gamme":"Haut de gamme"},
{"id" : "Y-3","gamme":"Haut de gamme"},
{"id" : "YIGAL AZROUEL","gamme":"Haut de gamme"},
{"id" : "YOHJI YAMAMOTO","gamme":"Haut de gamme"},
{"id" : "YVES SAINT LAURENT","gamme":"Haut de gamme"},
{"id" : "ZADIG & VOLTAIRE","gamme":"Tendance"},
{"id" : "ZARA  - hors ZARA basic","gamme":"Grand public"}]};

/* ! BRANDS */