var dtlDivArr = new Array();				// dialog contents object 배열

$(function(){
	// 시작시 layer 실행
	try{
	if(dtTp){
		mstView(dtTp, dtCd);
	}
	}catch(e){}
});

// 마스터 상세 뷰
function mstView(type,code){
	if($.trim(type)=='' || $.trim(code)=='') return;
	if(dtlReq(type,code,'','Y','',createNewDtlLayer())=='err') dtlPrev();
}

// ajax 요청 처리
function dtlReq(type,code, sType,titleYN, etcParam, dtlObj){
	var url = '';
	var tabType = [''];
	switch (type) {
	case 'movie':
		url = '/kobis/business/mast/mvie/searchMovieDtl.do';
		tabType = ['stat','thea'];
		break;
	case 'people':
		url = '/kobis/business/mast/peop/searchPeopleDtl.do';
		tabType = ['filmo'];
		break;

	case 'company':
		url = '/kobis/business/mast/comp/searchCompanyDtl.do';
		tabType = ['filmo'];
		break;

	case 'festival':
		url = '/kobis/business/mast/fest/searchFestivalDtl.do';
		tabType = ['award'];
		break;

	case 'promotion':
		url = '/kobis/business/mast/prom/searchPromotionDtl.do';
		break;

	case 'genreMovie':
		url = '/kobis/business/stat/them/searchGenreMovieDtl.do';
		break;

	default:
		return 'err';
	}

	var isOuterReq = location.href.indexOf("Outer.do")!= -1;
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: {code:code,sType:sType,titleYN:titleYN,etcParam:etcParam,isOuterReq:isOuterReq},
		  async: false,
		  success: function(data){
				if(dtlObj!=null){
					dtlObj.updateContents(data);
					if(data.indexOf("<error/>")!=-1){
						alert('해당 데이터가 존재하지 않습니다.');
						dtlPrev();
					}
					for(var i=0;i<tabType.length;i++){
						switch (tabType[i]) {
						case 'stat':
							$.post(url,{code:code,sType:tabType[i]},function(data){								
								dtlObj.parents(".ui-widget").find(".dtlLayer:eq(1)").html(innerShiv(data));
								fnTdTopValueCssSet(dtlObj.parents(".ui-widget").find(".dtlLayer:eq(1)"));
								dtlObj.refreshDialog();
								// 툴팁
								$(".dynaToolTip").dynaToolTip();
							});
							break;

						case 'thea':
							$.post(url,{code:code,sType:tabType[i]},function(data){								
								dtlObj.parents(".ui-widget").find(".dtlLayer:eq(2)").html(innerShiv(data));								
								fnTdTopValueCssSet(dtlObj.parents(".ui-widget").find(".dtlLayer:eq(2)"));
								dtlObj.refreshDialog();
								// 툴팁
								$(".dynaToolTip").dynaToolTip();
							});
							break;

						case 'filmo':
							$.post(url,{code:code,sType:tabType[i],isOuterReq:isOuterReq},function(data){
								dtlObj.parents(".ui-widget").find(".dtlLayer:eq(1)").html(innerShiv(data));
								dtlObj.refreshDialog();
								// 툴팁
								$(".dynaToolTip").dynaToolTip();
							});
							break;

						case 'award':
							$.post(url,{code:code,sType:tabType[i]},function(data){
								dtlObj.parents(".ui-widget").find(".dtlLayer:eq(1)").html(innerShiv(data));
								dtlObj.refreshDialog();
								// 툴팁
								$(".dynaToolTip").dynaToolTip();
							});
							break;

						default:
							break;
						}
					}

					dtlObj.dialog('open');
					dtlObj.overlayCss();		// modal layer 조정
					dtlBtnCss(dtlObj);
					handleMoreArea(dtlObj);		//더보기 영역 처리
					dtlAnimate(dtlObj);			//accordion, rolling 등
				}else{
					dtlObj = dtlDivArr[dtlDivArr.length-1];
					dtlObj.parents(".ui-widget").find(".dtlLayer:eq(1)").html(innerShiv(data));
				}

				 if (type == 'movie') {   // 만든사람들  처음 수행
					fn_staffActor(code,'N');
				};
			},
		  error: function(){
				alert('해당 정보를 조회하는데 실패하였습니다.');
				dtlPrev();
			},
		  dataType: 'text'
		});


}

// 배열의 마지막 레이어를 삭제하고 이전 레이어를 보여줌
function dtlPrev(){
	var dtlLayer = dtlDivArr.pop();
	if(dtlLayer){
		dtlLayer.removeDtl();
	}
	if(dtlDivArr.length>0){
		dtlLayer = dtlDivArr[dtlDivArr.length-1];
		if(dtlLayer){
			dtlLayer.showDtl();
		}
	}

};