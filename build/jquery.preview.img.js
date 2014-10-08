/*
 * jQuery preview img v0.0.1
 * Copyright 2014
 * Contributing Author: payne
 */
;
(function ($) {
    var previewImgO, defaults;
    previewImgO = function (el, options) {
        this.container = $(el);
        this.options = options;
        /** Small image list on the left */
        this.liList = $(el).find('.right-img-list li');
        /** Picture demonstration to the right button, click show the next */
        this.rightBtn = $(el).find('.right-view');
        /** A picture demonstration to the left button, click show the pri */
        this.leftBtn = $(el).find('.left-view');
        /** Click the icon down list area */
        this.downBtn = $(el).find('.down-view');
        /** A list of area up clicking on the icon */
        this.upBtn = $(el).find('.up-view');
        /** Close the preview button */
        this.closeBtn = $(el).find('.preview-title b');
        /** Display the title */
        this.titleName = $(el).find('.file-name-fs');
        /** Display images */
        this.showImgNode = $(el).find('.file-img-fs');
        this.create = function () {
            if (_this.options.imgArr.length > 0) {
                var imgArr = _this.options.imgArr;
                var liList = '';
                for (var i = 0, _i = imgArr.length; i < _i; i++) {
                    if (imgArr[i].name === undefined) imgArr[i].name = '';
                    liList += '<li data-name="' + imgArr[i].name + '" style="top:0" ' +
                        'data-url="' + imgArr[i].url + '">' +
                        '<img src="' + imgArr[i].url + '" alt=""/>' +
                        '</li>';
                }
                var currentFile = imgArr[0];
                var html = '<div class="view-image-fs" style="display: none">' +
                    '<div class="preview-title">' +
                    '<span class="file-name-fs">' + currentFile.name + '</span>' +
                    '<b></b>' +
                    '</div>' +
                    '<div class="left-show-img">' +
                    '<div>' +
                    '<button class="left-view"></button>' +
                    '<img class="file-img-fs" src="' + currentFile.url + '" alt=""/>' +
                    '<button class="right-view"></button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="right-img-list">' +
                    '<button class="up-view" style="display: none"></button>' +
                    '<ul>' + liList +
                    '</ul>' +
                    '<button class="down-view" style="display: none"></button>' +
                    '</div>' +
                    '</div>';
                $(body).append($(html));
            }
        };
        this.initShowImg = function () {
            var _this = this;
            if (_this.liList.get(0)) {
                if (_this.liList.length > 1) {
                    _this.rightBtn.removeClass('unUse');
                }
                _this.liList.each(function (i) {
                    /**
                     * Whether to add selected position and attribute
                     * information For all the small picture on the left
                     **/
                    $(this).attr('data-checked', false).attr('data-pos', i);

                    /**
                     * Initialize the default display area shows
                     * the first picture and related information*
                     */
                    if (i === 0) {
                        $(this).css('border', '2px solid ' + _this.options.imgCheckedBorderColor)
                            .attr('data-checked', true);
                    }
                });
            }
            if (_this.options.initShow && _this.options.showBtn !== '') {
                _this.show();
                _this.closeBtn.hide();
                selfAdapting(_this);
            }
            $(window).resize(function () {
                selfAdapting(_this);
            });
        };
        /**
         * Display image preview
         * @param _this
         */
        this.show = function (_this) {
            $('html').css('overflow', 'hidden');
            $('body').css('margin-right', '17px');
            _this.container.show();
            selfAdapting(_this);
            var timer = setTimeout(function () {
                /** animation effect */
                _this.container.addClass('previewImgShow');
                clearTimeout(timer);
            }, 20);
        };
        /**
         * close image preview
         * @param _this
         */
        this.close = function (_this) {
            _this.container.removeClass('previewImgShow');
            var timer = setTimeout(function () {
                _this.container.hide();
                $('html').removeAttr('style');
                $('body').removeAttr('style');
                clearTimeout(timer);
            }, 300);
        };
        /**
         * show the center image
         * @param name (left top title)
         * @param url (show image url)
         * @param _this
         */
        var changeImg = function (name, url, _this) {
            _this.liList.css('border', '2px solid #fff').attr('data-checked', false);
            _this.titleName.html(name);
            _this.showImgNode.attr('src', url).removeAttr('style');
            selfAdapting(_this);
        };

        var dealImg = function ($this, _this) {
            var name = $this.attr('data-name'),
                url = $this.attr('data-url');
            changeImg(name, url, _this);
            $this.css('border', '2px solid ' + _this.options.imgCheckedBorderColor)
                .attr('data-checked', true);
        };

        var rightViewShow = function (type, _this) {
            if (type === 'hide') {
                if (!_this.rightBtn.attr('class').match('unUse')) {
                    _this.rightBtn.addClass('unUse');
                }
            } else {
                if (_this.rightBtn.attr('class').match('unUse')) {
                    _this.rightBtn.removeClass('unUse');
                }
            }
        };

        var leftViewShow = function (type, _this) {
            if (type === 'hide') {
                if (!_this.leftBtn.attr('class').match('unUse')) {
                    _this.leftBtn.addClass('unUse');
                }
            } else {
                if (_this.leftBtn.attr('class').match('unUse')) {
                    _this.leftBtn.removeClass('unUse');
                }
            }
        };
        /**
         * Small images click event functions on the left
         */
        this.liListClick = function () {
            var _this = this;
            _this.liList.each(function () {
                $(this).click(function () {
                    var num = $(this).attr('data-pos'),
                        name = $(this).attr('data-name'),
                        url = $(this).attr('data-url');
                    if (num == 0) {
                        leftViewShow('hide', _this);
                        if (_this.liList.length !== 1) {
                            rightViewShow('show', _this);
                        }
                    } else if (~~num === _this.liList.length - 1) {
                        rightViewShow('hide', _this);
                        leftViewShow('show', _this);
                    } else {
                        rightViewShow('show', _this);
                        leftViewShow('show', _this);
                    }
                    changeImg(name, url, _this);
                    $(this).css('border', '2px solid ' + _this.options.imgCheckedBorderColor)
                        .attr('data-checked', true);
                });
            });
        };

        /**
         * right icon click event functions, show the next image
         * @param _this
         */
        this.rightBtnClick = function (_this) {
            var _this = _this, index, max = _this.liList.length;
            if (_this.leftBtn.attr('class').match('unUse')) {
                _this.leftBtn.removeClass('unUse');
            }
            _this.liList.each(function (i) {
                /**find the before selected image pos*/
                if ($(this).attr('data-checked') === 'true') {
                    index = i;
                    if (index === max - 2) {
                        _this.rightBtn.addClass('unUse');
                        return true;
                    }
                }

                /**click the btn, change the next image to selected*/
                if (i === index + 1) {
                    var pos = _this.liList.get(0).style.top,
                        ulViewHeight = getLiUlHeight(_this).ul,
                        listImgHeight = getLiUlHeight(_this).li,
                        ulHeight = listImgHeight * i + parseInt(pos);

                    /**Selected the small picture was hidden in the above*/
                    if (ulHeight <= 0) {
                        var rightPos = parseInt(pos) - ulHeight;
                        _this.liList.animate({
                            top: rightPos
                        });
                    } else {
                        var clickNum = Math.ceil((ulHeight - ulViewHeight) / listImgHeight);
                        if (clickNum > 0) {
                            _this.liList.animate({
                                top: parseInt(pos) - clickNum * ulHeight
                            });
                        }
                    }
                    dealImg($(this), _this);
                }
                if (index + 1 === 0) return;
            });
        };

        /**
         * left icon click event functions, show the pre image
         * @param _this
         */
        this.leftBtnClick = function (_this) {
            var _this = _this;
            rightViewShow('show', _this);
            var index;
            _this.liList.each(function (i) {
                if ($(this).attr('data-checked') === 'true') {
                    index = i;
                    if (index === 1) {
                        _this.leftBtn.addClass('unUse');
                        return true;
                    }
                }
            });
            _this.liList.each(function (j) {
                if (j === index - 1) {
                    var pos = _this.liList.get(0).style.top,
                        ulViewHeight = getLiUlHeight(_this).ul,
                        listImgHeight = getLiUlHeight(_this).li,
                        ulHeight = listImgHeight * j + parseInt(pos);

                    if (ulHeight > 0) {
                        if (ulHeight - ulViewHeight > 0) {
                            var clickNum = Math.ceil((ulHeight - ulViewHeight) / listImgHeight);
                            _this.liList.animate({
                                top: listImgHeight * (-clickNum) + parseInt(pos)
                            });
                        }
                    } else {
                        _this.liList.animate({
                            top: parseInt(pos) - ulHeight
                        });
                    }
                    dealImg($(this), _this);
                }
            });
        };

        /**
         * up and down move function
         * @param type
         * @param _this
         */
        this.upAndDownMove = function (type, _this) {
            var isMove = false,
                pos = _this.liList.get(0).style.top,
                ulViewHeight = getLiUlHeight(_this).ul,
                listImgHeight = getLiUlHeight(_this).li,
                downViewNum = -parseInt(pos) / listImgHeight,
                ulHeight = listImgHeight * _this.liList.length + parseInt(pos);
            if (type === 'up') {
                if (parseInt(pos) === 0) return;
                downViewNum--;
            }
            if (type === 'down') {
                if (ulHeight <= ulViewHeight) return;
                downViewNum++;
            }
            if (!isMove) {
                isMove = true;
                _this.liList.animate({
                    top: -downViewNum * listImgHeight
                }, 200, function () {
                    isMove = false;
                });
            }
        };
    };

    /**
     * get li and ul height
     * @returns {{ul: *, li: *}}
     */
    var getLiUlHeight = function (_this) {
        var getUlHeight = $('.right-img-list ul').height(),
            getLiHeight = $('.right-img-list ul li').outerHeight() + parseInt($('.right-img-list ul li').css('marginTop')),
            ulViewHeight = getUlHeight && getUlHeight > 0 ? getUlHeight : $(window).height() - 140,
            listImgHeight = getLiHeight && listImgHeight > 0 ? listImgHeight : _this.options.listImgHeight;
        return {
            ul: ulViewHeight,
            li: listImgHeight
        }
    };

    /**
     * Remove image adaptive
     * @param _this
     */
    var removeSelfAdapting = function (_this) {
        _this.showImgNode.removeAttr('style');
    };

    /**
     * Exhibit the picture size adaptation
     * @param _this
     */
    var selfAdapting = function (_this) {
        removeSelfAdapting(_this);
        var windowHeight = $(window).height(),
            windowWidth = $(window).width();
        if (_this.showImgNode.height() > windowHeight - 100) {
            _this.showImgNode.css({
                height: windowHeight - 100
            });
        }
        if (_this.showImgNode.width() > windowWidth - 300) {
            _this.showImgNode.css({
                width: windowWidth - 300
            });
        }
    };

    defaults = {
        listImgHeight: 72,
        haveTitle: true,
        imgArr: [],
        imgCheckedBorderColor: "#d73300",
        initShow: false,
        showBtn: "",
        haveHtml: false
    };

    $.fn.previewImg = function (options) {
        return $(this).each(function () {
            options = $.extend({}, defaults, options);
            var previewImg = new previewImgO(this, options);
            if (!options.haveHtml && options.imgArr.length > 0) previewImg.create();
            previewImg.initShowImg();
            if (options.showBtn && options.showBtn !== "") {
                options.showBtn.click(function () {
                    previewImg.show(previewImg);
                });
                previewImg.closeBtn.click(function () {
                    previewImg.close(previewImg);
                });
            }

            /** the list of small pictures click event */
            previewImg.liListClick();

            /** Exhibit click event for the icon to the right */
            previewImg.rightBtn.click(function () {
                previewImg.rightBtnClick(previewImg);
            });

            /** Exhibit click event for the icon to the left */
            previewImg.leftBtn.click(function () {
                previewImg.leftBtnClick(previewImg);
            });

            /** Exhibit click event for the icon to the up */
            previewImg.upBtn.click(function () {
                previewImg.upAndDownMove('up', previewImg);
            });

            /** Exhibit click event for the icon to the down */
            previewImg.downBtn.click(function () {
                previewImg.upAndDownMove('down', previewImg)
            });
        });
    }
})(jQuery);