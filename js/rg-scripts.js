

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
    //var hash = "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3";
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
    $('#types-selection').on("change", function(e) { updatePrices();});
    $('#brands-selection').on("change", function(e) { updatePrices();});
    
    function updatePrices() {
        var type = $('#types-selection').val();
        var brandName = $('#brands-selection').val()
        if(type != "" && brandName != "") {
            var brand = findBrand(brandName);
            prices = tarifsRef[brand.gamme][type];
            //$('#howmany-min').html(prices.min + ' &euro;');
            //$('#howmany-max').html(prices.max + ' &euro;');
            scrollNumber(0, 0, $('#howmany-min'), function() {
                scrollNumber(0, prices.min, $('#howmany-min'));
            });
            scrollNumber(0, 0, $('#howmany-max'), function() {
                scrollNumber(0, prices.max, $('#howmany-max'));
            });
        }
    }
    
    function scrollNumber(a, b, c, d) {
        var aInt = parseInt(a);
        var bInt = parseInt(b);
        var e = Math.floor(Math.min(Math.abs(bInt - aInt), 10)), f = Math.floor((bInt - aInt) / e, 10), g = 0, h = aInt, i = setInterval(function() {
        if (g === e) {
            c.html(toDollarsAndCents(b + "&euro;")), clearInterval(i), d && d();
            return;
        }
        h += f, c.html(toDollarsAndCents(Math.abs(h))+ "&euro;"), g++;
        }, 25);
    }
    
    function toDollarsAndCents(value){
        return value;//(value / 100).toFixed(2);
    }
    
    function loadBrandsTables() {
        var brands = brandsRef.brands;
        var nbByLines = 3;
        var nbInLine = 0;
        var previousLetter = "";
        var previousTable = false;
        var html = '<dl class="dl-horizontal">';
        var htmlIndex = "";
        var letters = new Array();
        
        for(i=0;i<brands.length;i++) {
            var brand = brands[i].id;
            /*
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
            html+= '<td class="brand">'+brand+'</td>';
            
            if(nbInLine >= nbByLines) {
                html+= '</tr>';
                nbInLine = 0;
            }*/
            if(previousLetter != brand.substring(0,1)) {
                if(previousTable) {
                    html+= '</ul></dd>';
                }
                previousTable = true;
                var newLetter= brand.substring(0,1);
                html+= '<dt id="brands-letter-'+newLetter+'">'+newLetter+'<a href="#brands" class="scrollto"><i class="fa fa-arrow-up"></i></a></dt><dd><ul>';
                previousLetter = newLetter;
                letters+= newLetter;
            }
            html+= '<li class="brand">'+brand+'</li>';
        }
        for(var j=letters.length-1;j>=0;j--) {
            htmlIndex = '<a href="#brands-letter-'+letters[j]+'" class="scrollto">' + letters[j] + '</a> ' + htmlIndex;
        }
        html = "</dl>" + html;
        $('#brands-list').html(html );
        $('#brands-list-index').html(htmlIndex);
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

function findBrand(id) {
    for(var i=0;i<brandsRef.brands.length;i++) {
        if(brandsRef.brands[i].id == id) {
            return brandsRef.brands[i];
        }
    }
}

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
{"id" : "3.1 PHILLIP LIM","gamme":"T"},
{"id" : "7 FOR ALL MANKIND","gamme":"T"},
{"id" : "ACNE","gamme":"HG"},
{"id" : "AGNÈS B.","gamme":"T"},
{"id" : "AMERICAN RETRO","gamme":"T"},
{"id" : "AMERICAN VINTAGE","gamme":"T"},
{"id" : "ANN DEMEULEMEESTER","gamme":"HG"},
{"id" : "ANTIK BATIK","gamme":"T"},
{"id" : "APC","gamme":"T"},
{"id" : "APOSTROPHE","gamme":"T"},
{"id" : "APRIL MAY","gamme":"T"},
{"id" : "ABERCROMBIE & FITCH","gamme":"GP"},
{"id" : "BALENCIAGA","gamme":"HG"},
{"id" : "BALMAIN","gamme":"HG"},
{"id" : "BANANA REPUBLIC","gamme":"GP"},
{"id" : "BARBARA BUI","gamme":"HG"},
{"id" : "BASH","gamme":"T"},
{"id" : "BCBG MAX AZRIA","gamme":"T"},
{"id" : "BEL AIR","gamme":"T"},
{"id" : "BELLEROSE","gamme":"T"},
{"id" : "BELSTAFF","gamme":"T"},
{"id" : "BIMBA & LOLA","gamme":"T"},
{"id" : "BOUCHRA JARRAR","gamme":"HG"},
{"id" : "BRUNELLO CUCINELLI","gamme":"T"},
{"id" : "BRUUNS BAZAAR","gamme":"T"},
{"id" : "BURBERRY BRIT","gamme":"T"},
{"id" : "BURBERRY LONDON","gamme":"HG"},
{"id" : "BURBERRY PRORSUM","gamme":"HG"},
{"id" : "BY MALENE BIRGER","gamme":"T"},
{"id" : "BY ZOE","gamme":"T"},
{"id" : "CACHAREL","gamme":"T"},
{"id" : "CALLA","gamme":"T"},
{"id" : "CANADA GOOSE","gamme":"T"},
{"id" : "CARVEN","gamme":"HG"},
{"id" : "CATHERINE MALANDRINO","gamme":"T"},
{"id" : "CELINE","gamme":"HG"},
{"id" : "CHANEL","gamme":"HG"},
{"id" : "CHEAP MONDAY","gamme":"GP"},
{"id" : "CHLOÉ","gamme":"HG"},
{"id" : "CHRISTINE PHUNG","gamme":"HG"},
{"id" : "CHRISTIAN DIOR","gamme":"HG"},
{"id" : "CHRISTIAN LACROIX","gamme":"HG"},
{"id" : "CHRISTOPHE LEMAIRE","gamme":"HG"},
{"id" : "CIRCUS & CO","gamme":"GP"},
{"id" : "CLAUDIE PIERLOT","gamme":"T"},
{"id" : "CLUB MONACO","gamme":"GP"},
{"id" : "COMME DES GARCONS","gamme":"HG"},
{"id" : "COMPTOIR DES COTONNIERS","gamme":"GP"},
{"id" : "COP COPINE","gamme":"GP"},
{"id" : "COS","gamme":"GP"},
{"id" : "COTÉLAC","gamme":"T"},
{"id" : "COURREGES","gamme":"HG"},
{"id" : "CULTURE VINTAGE","gamme":"GP"},
{"id" : "D&G","gamme":"T"},
{"id" : "DES PETITS HAUTS","gamme":"GP"},
{"id" : "DIANE VON FURSTENBERG","gamme":"T"},
{"id" : "DIESEL","gamme":"GP"},
{"id" : "DIOR","gamme":"HG"},
{"id" : "DKNY","gamme":"GP"},
{"id" : "DOLCE & GABBANA","gamme":"HG"},
{"id" : "DONNA KARAN","gamme":"T"},
{"id" : "DRIES VAN NOTEN","gamme":"HG"},
{"id" : "EKYOG  - hors pièces basiques","gamme":"GP"},
{"id" : "EQUIPMENT","gamme":"T"},
{"id" : "ERIC BOMPARD","gamme":"T"},
{"id" : "EROTOKRITOS","gamme":"T"},
{"id" : "ESCADA","gamme":"HG"},
{"id" : "ET VOUS","gamme":"GP"},
{"id" : "ETRO","gamme":"HG"},
{"id" : "FRENCH CONNECTION","gamme":"GP"},
{"id" : "GAT RIMON","gamme":"T"},
{"id" : "GERARD DAREL","gamme":"T"},
{"id" : "GIANNI VERSACE","gamme":"HG"},
{"id" : "GIVENCHY","gamme":"HG"},
{"id" : "GUCCI","gamme":"HG"},
{"id" : "HARTFORD","gamme":"T"},
{"id" : "HEIMSTONE","gamme":"T"},
{"id" : "HERMÈS","gamme":"HG"},
{"id" : "HERVE LEGER","gamme":"HG"},
{"id" : "HOGAN","gamme":"HG"},
{"id" : "HUGO BOSS","gamme":"T"},
{"id" : "IKKS","gamme":"T"},
{"id" : "IRENE VAN RYB","gamme":"T"},
{"id" : "IRIÉ","gamme":"T"},
{"id" : "IRO","gamme":"T"},
{"id" : "ISABEL MARANT","gamme":"HG"},
{"id" : "ISABEL MARANT ETOILE","gamme":"T"},
{"id" : "ISSEY MIYAKE","gamme":"HG"},
{"id" : "JAY AHR","gamme":"HG"},
{"id" : "JEAN PAUL GAULTIER","gamme":"HG"},
{"id" : "JIL SANDER","gamme":"HG"},
{"id" : "JOHN GALLIANO","gamme":"HG"},
{"id" : "JOOP!","gamme":"T"},
{"id" : "JOSEPH","gamme":"T"},
{"id" : "JUNYA WATANABE","gamme":"HG"},
{"id" : "JUST CAVALLI","gamme":"HG"},
{"id" : "KAREN MILLEN","gamme":"T"},
{"id" : "KARL LAGERFELD","gamme":"HG"},
{"id" : "KENNETH COLE","gamme":"T"},
{"id" : "KENZO","gamme":"HG"},
{"id" : "KITSUNE","gamme":"T"},
{"id" : "LACOSTE","gamme":"GP"},
{"id" : "LANVIN","gamme":"HG"},
{"id" : "LAURENCE DOLIGE","gamme":"T"},
{"id" : "LE MONT SAINT MICHEL","gamme":"T"},
{"id" : "LE PETIT LUCAS DU TERTRE","gamme":"T"},
{"id" : "LEONARD","gamme":"HG"},
{"id" : "LES PETITES","gamme":"T"},
{"id" : "LOLA","gamme":"T"},
{"id" : "LOUIS VUITTON","gamme":"HG"},
{"id" : "MADAME A PARIS","gamme":"T"},
{"id" : "MADELEINE THOMPSON","gamme":"T"},
{"id" : "MADEMOISELLE TARA","gamme":"GP"},
{"id" : "MAISON MARTIN MARGIELA","gamme":"HG"},
{"id" : "MAISON OLGA","gamme":"T"},
{"id" : "MAJE","gamme":"T"},
{"id" : "MANOUSH","gamme":"T"},
{"id" : "MARC BY MARC JACOBS","gamme":"T"},
{"id" : "MARC JACOBS","gamme":"HG"},
{"id" : "MARNI","gamme":"HG"},
{"id" : "MAX MARA","gamme":"HG"},
{"id" : "MCQ","gamme":"HG"},
{"id" : "MISSONI","gamme":"HG"},
{"id" : "MIU MIU","gamme":"HG"},
{"id" : "MONCLER","gamme":"HG"},
{"id" : "NINA RICCI","gamme":"HG"},
{"id" : "OLYMPIA LE TAN","gamme":"HG"},
{"id" : "PABLO DE GERARD DAREL","gamme":"T"},
{"id" : "PARAJUMPERS","gamme":"T"},
{"id" : "PATRIZIA PEPE","gamme":"T"},
{"id" : "PAUL & JOE","gamme":"T"},
{"id" : "PAUL & JOE SISTER","gamme":"GP"},
{"id" : "PAUL SMITH","gamme":"HG"},
{"id" : "PAUL SMITH BLACK","gamme":"HG"},
{"id" : "PAULE KA","gamme":"T"},
{"id" : "PRADA","gamme":"HG"},
{"id" : "PROENZA SCHOULER","gamme":"HG"},
{"id" : "PYRENEX","gamme":"T"},
{"id" : "RAF SIMONS","gamme":"HG"},
{"id" : "RAG & BONE","gamme":"T"},
{"id" : "RALPH LAUREN","gamme":"T"},
{"id" : "RALPH LAUREN BLACK LABEL","gamme":"T"},
{"id" : "RALPH LAUREN BLUE LABEL","gamme":"T"},
{"id" : "RALPH LAUREN COLLECTION","gamme":"T"},
{"id" : "RALPH LAUREN DENIM & SUPPLY","gamme":"T"},
{"id" : "RALPH LAUREN DOUBLE RL","gamme":"T"},
{"id" : "RALPH LAUREN SPORT","gamme":"T"},
{"id" : "RED VALENTINO","gamme":"HG"},
{"id" : "REISS","gamme":"T"},
{"id" : "REPETTO","gamme":"T"},
{"id" : "RICK OWENS","gamme":"HG"},
{"id" : "ROBERTO CAVALLI","gamme":"HG"},
{"id" : "RODIER","gamme":"T"},
{"id" : "ROSEANNA","gamme":"T"},
{"id" : "SAINT JAMES","gamme":"GP"},
{"id" : "SAINT LAURENT","gamme":"HG"},
{"id" : "SANDRO","gamme":"T"},
{"id" : "SCARLETT ROOS","gamme":"GP"},
{"id" : "SEE BY CHLOÉ","gamme":"T"},
{"id" : "SESSUN","gamme":"GP"},
{"id" : "SONIA BY SONIA RYKIEL","gamme":"T"},
{"id" : "SONIA RYKIEL","gamme":"HG"},
{"id" : "SOPHIA KOKOSALAKI","gamme":"HG"},
{"id" : "STELLA CADENTE","gamme":"T"},
{"id" : "STELLA FOREST","gamme":"T"},
{"id" : "STELLA MC CARTNEY","gamme":"HG"},
{"id" : "SWILDENS","gamme":"T"},
{"id" : "TARA JARMON","gamme":"T"},
{"id" : "THE KOOPLES","gamme":"T"},
{"id" : "THE KOOPLES SPORT","gamme":"T"},
{"id" : "THOMSEN","gamme":"T"},
{"id" : "TOM FORD","gamme":"HG"},
{"id" : "TSUMORI CHISATO","gamme":"HG"},
{"id" : "VALENTINO","gamme":"HG"},
{"id" : "VANESSA BRUNO","gamme":"HG"},
{"id" : "VANESSA BRUNO ATHE","gamme":"T"},
{"id" : "VENTCOUVERT","gamme":"T"},
{"id" : "VERA WANG","gamme":"HG"},
{"id" : "VERONIQUE LEROY","gamme":"T"},
{"id" : "VERSACE","gamme":"HG"},
{"id" : "VINCE","gamme":"T"},
{"id" : "VIONNET","gamme":"HG"},
{"id" : "VIRGINIE CASTAWAY","gamme":"T"},
{"id" : "VIVIENNE WESTWOOD","gamme":"HG"},
{"id" : "VIVIENNE WESTWOOD RED LABEL","gamme":"HG"},
{"id" : "Y-3","gamme":"HG"},
{"id" : "YIGAL AZROUEL","gamme":"HG"},
{"id" : "YOHJI YAMAMOTO","gamme":"HG"},
{"id" : "YVES SAINT LAURENT","gamme":"HG"},
{"id" : "ZADIG & VOLTAIRE","gamme":"T"},
{"id" : "ZARA  - hors ZARA basic","gamme":"GP"}]};

var tarifsRef = { "GP" :
    {
        "top" :{"min" : "5", "max" : "8,75"},
        "pull":{"min" : "5", "max" : "8,75"},
        "jupe":{"min" : "5", "max" : "8,75"},
        "combinaison":{"min" : "6", "max" : "8,75"},
        "robe":{"min" : "6", "max" : "12,50"},
        "veste":{"min" : "6", "max" : "10"},
        "blouson":{"min" : "6", "max" : "10"},
        "trench":{"min" : "6", "max" : "17,50"},
        "manteau":{"min" : "6", "max" : "17,50"},
    }
    , "T" :
    {
        "top":{"min" : "6", "max" : "12,50"},
        "pull":{"min" : "6", "max" : "12,50"},
        "jupe":{"min" : "6", "max" : "12,50"},
        "combinaison":{"min" : "8", "max" : "12,50"},
        "robe":{"min" : "8", "max" : "17,50"},
        "veste":{"min" : "8", "max" : "15"},
        "blouson":{"min" : "8", "max" : "15"},
        "trench":{"min" : "10", "max" : "50"},
        "manteau":{"min" : "10", "max" : "75"},
    }, "HG" :
    {
        "top":{"min" : "8", "max" : "25"},
        "pull":{"min" : "8", "max" : "37,50"},
        "jupe":{"min" : "8", "max" : "25"},
        "combinaison":{"min" : "10", "max" : "25"},
        "robe":{"min" : "10", "max" : "50"},
        "veste":{"min" : "10", "max" : "50"},
        "blouson":{"min" : "10", "max" : "50"},
        "trench":{"min" : "15", "max" : "125"},
        "manteau":{"min" : "15", "max" : "125"},
    }, "VHG" :
    {
        "top":{"min" : "6", "max" : "20"},
        "pull":{"min" : "6", "max" : "25"},
        "jupe":{"min" : "6", "max" : "17,50"},
        "combinaison":{"min" : "8", "max" : "17,50"},
        "robe":{"min" : "8", "max" : "25"},
        "veste":{"min" : "8", "max" : "25"},
        "blouson":{"min" : "8", "max" : "25"},
        "trench":{"min" : "10", "max" : "62,50"},
        "manteau":{"min" : "10", "max" : "62,50"},
    },
}

/* ! BRANDS */