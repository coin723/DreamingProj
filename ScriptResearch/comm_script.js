/*********************************************************************
 * 함 수 명 : fn_staffActor
 * 함수설명 : 영화 만든사람들
 * 입    력 : 영화코드 ,  더보기, 감추기 여부
 * 결    과 : 영화상세 만든사람들 화면 출력
 *********************************************************************/

function fn_staffActor(strMovieCd , strMgmtItem) {

    var strArg = "<h3>만든 사람들</h3>";
    var strDirector = "";
    var vDCnt = 0;
    var vCnt = 0;
    var cMgmtItem = "N";
    var vColor = 0;

    $("#" + strMovieCd + "_director").find("li").remove();

    strArg += "<div class=\"peopContent1\" style=\"padding-top:0px;display:none;\"><ul id=\"" + strMovieCd + "_director\">";
    strArg += "</ul></div>";
    strArg += "<div id=\"directorLine\" class=\"dotline\" style=\"padding-top:0px;display:none;\"></div>";

    $.ajax({
        type : "POST",
        url : "/kobis/business/mast/mvie/searchMovActorLists.do",
        data : {
            movieCd: strMovieCd 
        },
        async : false,
        dataType : "json",
        success : function(data) {
            var vactorGb = "";

            var vSubCnt = 0;
            var vStrActorGb = "";
            strArg += "<div class=\"peopContent2\" style=\"padding-top:0px;\">";

            $.each(data, function() {
                if (vactorGb != this["actorGb"]) {
                    vDCnt += 1;
                    if (vDCnt == 1) {
                        strArg += "<ul><li class=\"peopContSub1\">배우</li></ul>";
                        //strArg += "<ul><li class=\"peopContSub1\">"+this["repRoleNm"]+"</li></ul>";
                    }

                    if (this["actorGb"] != vactorGb) {
                        if (this["actorGb"] == "1") {
                            vStrActorGb = "주연";
                        } else if (this["actorGb"] == "2") {
                            vStrActorGb = "조연";
                        } else {
                            vStrActorGb = "단역";
                        }
                        strArg += "<ul><li class=\"peopContSub2\">" + vStrActorGb + "</li>";
                        strArg += "<li class=\"peopContSub3\">";
                        strArg += "<table class=\"peopContTable\"><tr><td>";
                        vSubCnt = 0;
                    }
                }
                vSubCnt += 1;

                if (vSubCnt != this["maxActorGb"]) {
                    if ( this["cast"] == "" || this["cast"] == null ) {
                        strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\">";
                        if (this["peopleCd"] == "" || this["peopleCd"] == null) {
                            strArg += "<span style=\"color:#666666;padding-right:10px;\">" + this["actorNm"] + "</span>";
                        } else {
                            strArg += "<a style=\"color:#666666;padding-right:10px;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["actorNm"] + "</a>";
                        }
                        strArg += "|</div>";
                    } else {
                        strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\">";
                        if (this["peopleCd"] == "" || this["peopleCd"] == null) {
                            strArg += "<span style=\"color:#666666;padding-right:10px;\">" + this["actorNm"] + "(" + this["cast"] + ")" + "</span>";
                        } else {
                            strArg += "<a style=\"color:#666666;padding-right:10px;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["actorNm"] + "(" + this["cast"] + ")</a>";
                        }
                        strArg += "|</div>";
                    }
                } else {
                    if ( this["cast"] == "" || this["cast"] == null ) {
                        strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\">";
                        if (this["peopleCd"] == "" || this["peopleCd"] == null) {
                            strArg += "<span style=\"color:#666666;padding-right:10px;\">" + this["actorNm"] + "</span>";
                        } else {
                            strArg += "<a style=\"color:#666666;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["actorNm"] + "</a>";
                            strArg += "</div>";
                        }
                    } else {
                        strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\">";
                        if (this["peopleCd"] == "" || this["peopleCd"] == null) {
                            strArg += "<span style=\"color:#666666;padding-right:10px;\">" + this["actorNm"] + "(" + this["cast"] + ")" + "</span>";
                        } else {
                            strArg += "<a style=\"color:#666666;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["actorNm"] + "(" + this["cast"] + ")</a>";
                            strArg += "</div>";
                        }
                    }
                }


                if (vSubCnt == this["maxActorGb"]) {
                    strArg += "</td></tr></table></li></ul>";
                }

                vactorGb = this["actorGb"];

            });
            strArg += "</div>";

            if (vDCnt != 0) {
                strArg += "<div class=\"dotline\" style=\"padding-top:0px;\"></div>";
            } else {
                vColor = 1;
            }
        }
    });

    $.ajax({
        type : "POST",
        url : "/kobis/business/mast/mvie/searchMovStaffLists.do",
        data : {
            movieCd: strMovieCd ,
            mgmtMore: strMgmtItem 
        },
        dataType : "json",
        async : false,
        success : function(data) {
            var vSubCnt = 0;
            var vdirCnt = 0;
            var vcomCd2 = "";
            var vroleCd = "";

            $.each(data, function() {

                if (vcomCd2 != this["comCd2"] || this["comCd2"] == this["roleCd"].substring(2, 4)) {
                    if (this["comCd2"] == "03" && this["roleCd"] == "320301" ) {
                        //감독일 경우

                        vdirCnt += 1;
                        if (vdirCnt == 1) {
                            strDirector += "<li class=\"sub1\">감독</li>";
                        }

                        if (vdirCnt != this["maxRoleCd"]) {
                            if ( this["detailRoleNm"] == "" || this["detailRoleNm"] == null ) {
                                strDirector += "<div class=\"sub2\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;padding-right:10px;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + "</a>|</div>";
                            } else {
                                strDirector += "<div class=\"sub2\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;padding-right:10px;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + ">(" + this["detailRoleNm"] + ")</a>|</div>";
                            }

                        } else {
                            if ( this["detailRoleNm"] == "" || this["detailRoleNm"] == null ) {
                                strDirector += "<div class=\"sub2\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + "</a></div>";
                            } else {
                                strDirector += "<div class=\"sub2\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + ">(" + this["detailRoleNm"] + ")</a></div>";
                            }
                        }

                    } else {

                        if (vcomCd2 != this["comCd2"] && vroleCd != this["roleCd"]) {
                            vCnt += 1;
                            if (vCnt != 1) {
                                strArg += "</div>";
                                strArg += "<div class=\"dotline\" style=\"padding-top:0px;\"></div>";
                            }

                            if (vCnt % 2 == vColor) {
                                strArg += "<div class=\"peopContent2\" style=\"padding-top:0px;\">";
                            } else {
                                strArg += "<div class=\"peopContent3\" style=\"padding-top:0px;\">";
                            }
                        }

                        if (vcomCd2 != this["comCd2"] && vroleCd != this["roleCd"]) {
                            strArg += "<ul><li class=\"peopContSub1\">" + this["roleGroupNm"] + "</li></ul>";
                        }
                        if (vcomCd2 != this["comCd2"] || vroleCd != this["roleCd"]) {
                            strArg += "<ul><li class=\"peopContSub2\">" + this["roleNm"] + "</li>";
                            strArg += "<li class=\"peopContSub3\">";
                            strArg += "<table class=\"peopContTable\"><tr><td>";
                            vSubCnt = 0;
                        }
                        vSubCnt += 1;

                        if (vSubCnt != this["maxRoleCd"]) {
                            if ( this["detailRoleNm"] == "" || this["detailRoleNm"] == null ) {
                                strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;padding-right:10px;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + "</a>|</div>";
                            } else {
                                strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;padding-right:10px;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + "(" + this["detailRoleNm"] + ")</a>|</div>";
                            }
                        } else {
                            if ( this["detailRoleNm"] == "" || this["detailRoleNm"] == null ) {
                                strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + "</a></div>";
                            } else {
                                strArg += "<div class=\"peopContNm\" style=\"padding:5px 6px 2px 6px;float:left;\"><a style=\"color:#666666;\" href=\"#none\" onclick=\"mstView('people','" + this["peopleCd"] + "');return false;\">" + this["peopleNm"] + "(" + this["detailRoleNm"] + ")</a></div>";
                            }
                        }

                        if (vSubCnt == this["maxRoleCd"]) {
                            strArg += "</td></tr></table></li></ul>";
                        }

                        vroleCd = this["roleCd"];
                        vcomCd2 = this["comCd2"];
                    }

                }
                cMgmtItem = this["mgmtItem"];

            });

            strArg += "</div>";

            if (cMgmtItem != "Y") {
                if (strMgmtItem == "N") {
                    strArg += "<div><a href=\"#none\" onclick=\"fn_staffActor('" + strMovieCd + "','Y');return false;\"><span class='btn_more02'>더보기</span></a></div>";
                } else {
                    strArg += "<div><a href=\"#none\" onclick=\"fn_staffActor('" + strMovieCd + "','N');return false;\"><span class='btn_more02'>감추기</span></a></div>";
                }
            }

            if (vCnt != 0 || vDCnt != 0 || strDirector != "") {
                $("#" + strMovieCd + "_staff").html(strArg);
            }

            if (strDirector != "") {
                $("#" + strMovieCd + "_director").find("li").remove();
                $("#" + strMovieCd + "_director").append(strDirector);
                $(".peopContent1").attr("style", "padding-top:0px;display:block");
                $("#directorLine").attr("style", "padding-top:0px;display:block");
            }
        }
    });

    /*
    		if  (navigator.userAgent.toLowerCase().indexOf('msie 7') != -1 || navigator.userAgent.toLowerCase().indexOf('msie 6') != -1){
    			$(".peopContNm").attr("style","width:300px");
    		}
    	 */
}