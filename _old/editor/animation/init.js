//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in || [1, 9];

            var strCheckioInput = checkioInput.join(",");

            if (data.error) {
                $content.find('.call').html('Fail: find_distance(' + strCheckioInput + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: find_distance(' + strCheckioInput + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: find_distance(' + strCheckioInput + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            if (checkioInput[0] < 99 && checkioInput[1] < 99) {
                var canvas = new DestinationSpiralCanvas(checkioInput);
                canvas.createCanvas($content.find(".explanation")[0]);
            }


            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
        var tcanvas;
        var tooltip = false;

        ext.set_console_process_ret(function (this_e, ret) {
            $tryit.find(".checkio-result-in").html(ret);

        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit')));
            tcanvas = new DestinationSpiralCanvas([9, 1]);
            tcanvas.createCanvas($tryit.find(".tryit-canvas")[0]);
            tcanvas.createFeedback(function(data, e){
                this_e.sendToConsoleFunction("find_distance", data[0], data[1]);
                e.stopPropagation();
                return false;
            });
            $tryit.find(".tryit-canvas").mouseenter(function (e) {
                if (tooltip) {
                    return false;
                }
                var $tooltip = $tryit.find(".tryit-canvas .tooltip");
                $tooltip.fadeIn(1000);
                setTimeout(function () {
                    $tooltip.fadeOut(1000);
                }, 2000);
                tooltip = true;
                return false;
            });

        });

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#9D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";


        function DestinationSpiralCanvas(dataInput) {
            var zx = 10;
            var zy = 10;
            var cellSize = 30;
            var cellN = 10;
            var fullSize = zx + cellN * cellSize;

            var defaultMap = [
                [82, 83, 84, 85, 86, 87, 88, 89, 90, 91],
                [81, 50, 51, 52, 53, 54, 55, 56, 57, 92],
                [80, 49, 26, 27, 28, 29, 30, 31, 58, 93],
                [79, 48, 25, 10, 11, 12, 13, 32, 59, 94],
                [78, 47, 24,  9,  2,  3, 14, 33, 60, 95],
                [77, 46, 23,  8,  1,  4, 15, 34, 61, 96],
                [76, 45, 22,  7,  6,  5, 16, 35, 62, 97],
                [75, 44, 21, 20, 19, 18, 17, 36, 63, 98],
                [74, 43, 42, 41, 40, 39, 38, 37, 64, 99],
                [73, 72, 71, 70, 69, 68, 67, 66, 65, 100]
            ];

            var colorDark = "#294270";
            var colorOrange = "#F0801A";
            var colorBlue = "#8FC7ED";
            var colorDarkBlue = "#0A82BD";
            var colorWhite = "#FFFFFF";
            var attrRect = {"stroke": colorDark, "stroke-width": 2, "fill": colorBlue};
            var attrRectMark = {"stroke": colorDark, "stroke-width": 3, "fill": colorDarkBlue};
            var attrLine = {"stroke": colorOrange, "stroke-width": 3, "stroke-linecap": "round"};
            var attrText = {"font-family": "Verdana", "font-size": 14, "stroke": colorDark};

            var cell1 = dataInput[0];
            var marked1;
            var cell2 = dataInput[1];
            var marked2;

            var line1;
            var line2;
            var rectSet;
            var textSet;
            var flag = 0;

            this.createCanvas = function(dom) {

                this.paper = Raphael(dom, fullSize, fullSize, 0, 0);
                rectSet = this.paper.set();
                textSet = this.paper.set();
                for (var i = 0; i < cellN; i++){
                    for (var j = 0; j < cellN; j++){
                        var r = this.paper.rect(zx + cellSize * j, zy + cellSize * i,
                            cellSize, cellSize).attr(attrRect);
                        if (defaultMap[i][j] == cell1) {
                            var from = [i, j];
                            marked1 = i * cellN + j;
                            r.attr(attrRectMark);
                        }
                        if (defaultMap[i][j] == cell2) {
                            var to = [i, j];
                            marked2 = i * cellN + j;
                            r.attr(attrRectMark);
                        }
                        var t = this.paper.text(zx + cellSize * j + cellSize / 2,
                            zy + cellSize * i + cellSize / 2,
                            String(defaultMap[i][j])).attr(attrText);
                        r.mark = i * cellN + j;
                        t.mark = i * cellN + j;
                        rectSet.push(r);
                        textSet.push(t);
                    }
                }
                var middle = [from[0], to[1]];
                line1 = this.paper.path(Raphael.format("M{0},{1}L{2},{3}",
                    zx + cellSize * middle[1] + cellSize / 2,
                    zy + cellSize * middle[0] + cellSize / 2,
                    zx + cellSize * from[1] + cellSize / 2,
                    zy + cellSize * from[0] + cellSize / 2
                )).attr(attrLine).toBack();
                line2 = this.paper.path(Raphael.format("M{0},{1}L{2},{3}",
                    zx + cellSize * middle[1] + cellSize / 2,
                    zy + cellSize * middle[0] + cellSize / 2,
                    zx + cellSize * to[1] + cellSize / 2,
                    zy + cellSize * to[0] + cellSize / 2
                )).attr(attrLine).toBack();
                rectSet.toBack();
            };

            this.createFeedback = function(callback){
                this.paper.set(rectSet, textSet).click(function(e) {
                    rectSet[this.mark].attr(attrRectMark);
                    if (flag) {
                        cell2 = parseInt(textSet[this.mark].attr("text"));
                        rectSet[marked2].attr(attrRect);
                        marked2 = this.mark;
                    }
                    else {
                        cell1 = parseInt(textSet[this.mark].attr("text"));
                        rectSet[marked1].attr(attrRect);
                        marked1 = this.mark;
                    }
                    flag = (flag + 1) % 2;
                    var middle = [Math.floor(marked1 / cellN), marked2 % cellN];
                    line1.animate({"path": Raphael.format("M{0},{1}L{2},{3}",
                        zx + cellSize * middle[1] + cellSize / 2,
                        zy + cellSize * middle[0] + cellSize / 2,
                        zx + cellSize * (marked1 % cellN) + cellSize / 2,
                        zy + cellSize * Math.floor(marked1 / cellN) + cellSize / 2
                    )}, 200);
                    line2.animate({"path": Raphael.format("M{0},{1}L{2},{3}",
                        zx + cellSize * middle[1] + cellSize / 2,
                        zy + cellSize * middle[0] + cellSize / 2,
                        zx + cellSize * (marked2 % cellN) + cellSize / 2,
                        zy + cellSize * Math.floor(marked2 / cellN) + cellSize / 2
                    )}, 200);
                    if (callback) {
                        callback([cell1, cell2], e);
                    }
                })
            }

        }


    }
);
