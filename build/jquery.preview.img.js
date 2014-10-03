/*
 * jQuery preview-img v0.0.1
 * Copyright 2014
 * Contributing Author: payne
 */
;
(function ($) {
    var previewImgO, defaults;
    previewImgO = function (el, options) {
        this.container = $(el);
        this.options = options;
        this.liList = this.container.find('.right-img-list li');//左边小图片列表
        this.rightBtn = this.container.find('.right-view');//图片展示区向右按钮，点击显示下一张
        this.leftBtn = this.container.find('.left-view');//图片展示区向左按钮，点击显示上一张
        this.downBtn = this.container.find('.down-view'); //列表区向下点击图标
        this.upBtn = this.container.find('.up-view');//列表区向上点击图标
        this.closeBtn = this.container.find('.preview-title b');//关闭预览图按钮
        this.titleName = this.container.find('.file-name-fs');//显示区标题
        this.showImgNode = this.container.find('.file-img-fs');//显示区图片
        this.create = function() {
           if(_this.options.imgArr.length > 0) {
               var imgArr = _this.options.imgArr;
               var liList = '';
               for(var i = 0, _i = imgArr.length; i < _i; i++) {
                   if(imgArr[i].name === undefined) imgArr[i].name = '';
                   liList += '<li data-name="'+imgArr[i].name+'" style="top:0" ' +
                       'data-url="'+imgArr[i].url+'">' +
                   '<img height="60" src="'+imgArr[i].url+'" alt=""/>' +
                   '</li>';
               }
               var currentFile = imgArr[0];
               var html = '<div class="view-image-fs" style="display: none">' +
                   '<div class="preview-title">' +
                   '<span class="file-name-fs">'+currentFile.name+'</span>' +
                   '<b></b>' +
                   '</div>' +
                   '<div class="left-show-img">' +
                   '<div>' +
                   '<button class="left-view"></button>' +
                   '<img class="file-img-fs" src="'+currentFile.url+'" alt=""/>' +
                   '<button class="right-view"></button>' +
                   '</div>' +
                   '</div>' +
                   '<div class="right-img-list">' +
                   '<button class="up-view" style="display: none"></button>' +
                   '<ul>' +liList+
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
                    _this.rightBtn.show();
                }
                _this.liList.each(function (i) {
                    //对所有左边小图片添加是否选中及位置属性信息
                    $(this).attr('data-checked', false).attr('data-pos', i);
                    //初始化默认显示区域显示第一张图片及相关信息
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
            $(window).resize(function() {
                selfAdapting(_this);
            });
        };
        //显示图片预览
        this.show = function (_this) {
            $('html').css('overflow', 'hidden');
            _this.container.show();
            selfAdapting(_this);
            var timer = setTimeout(function() {
                _this.container.addClass('previewImgShow');
                clearTimeout(timer);
            }, 20);
        };
        this.close = function (_this) {
            _this.container.removeClass('previewImgShow');
            $('html').removeAttr('style');
            var timer = setTimeout(function() {
                _this.container.hide();
                clearTimeout(timer);
            }, 300);
        };
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
                if (_this.rightBtn.css('display') !== 'none') {
                    _this.rightBtn.hide();
                }
            } else {
                if (_this.rightBtn.css('display') === 'none') {
                    _this.rightBtn.show();
                }
            }
        };
        var leftViewShow = function(type, _this) {
            if(type === 'hide') {
                if(_this.leftBtn.css('display') !== 'none') {
                    _this.leftBtn.hide();
                }
            }else{
                if(_this.leftBtn.css('display') === 'none') {
                    _this.leftBtn.show();
                }
            }
        };
        //左边小图片点击事件函数
        this.liListClick = function() {
            var _this = this;
            _this.liList.each(function() {
                $(this).click(function() {
                    var num = $(this).attr('data-pos'),
                        name = $(this).attr('data-name'),
                        url = $(this).attr('data-url');
                    if(num == 0) {
                        leftViewShow('hide', _this);
                        if(_this.liList.length !== 1) {
                            rightViewShow('show', _this);
                        }
                    }else if(~~num === _this.liList.length -1) {
                        rightViewShow('hide', _this);
                        leftViewShow('show', _this);
                    }else{
                        rightViewShow('show', _this);
                        leftViewShow('show', _this);
                    }
                    changeImg(name, url, _this);
                    $(this).css('border', '2px solid '+_this.options.imgCheckedBorderColor)
                        .attr('data-checked', true);
                });
            });
        };
        this.rightBtnClick = function(_this) {
            var _this = _this, index, max = _this.liList.length;
            if(_this.leftBtn.css('display') === 'none') {
                _this.leftBtn.show();
            }
            _this.liList.each(function(i) {
                if($(this).attr('data-checked') === 'true') {
                    index = i;
                    if(index === max - 2) {
                        _this.rightBtn.hide();
                        return true;
                    }
                }
                if(i === index + 1) {
                    var pos = _this.liList.get(0).style.top,
                        ulHeight = _this.options.listImgHeight * i + parseInt(pos),
                        ulViewHeight = $(window).height() - 140;
                    if(ulHeight <= 0) {
                        var rightPos = parseInt(pos) - ulHeight;
                        _this.liList.animate({
                            top: rightPos
                        });
                    }else {
                        var clickNum = Math.ceil((ulHeight - ulViewHeight)/_this.options.listImgHeight);
                        if(clickNum > 0) {
                            _this.liList.animate({
                                top: parseInt(pos) - clickNum * ulHeight
                            });
                        }
                    }
                    dealImg($(this), _this);
                }
                if(index + 1 === 0) return;
            });
        };
        this.leftBtnClick = function(_this) {
            var _this = _this;
            rightViewShow('show', _this);
            var index;
            _this.liList.each(function(i) {
                if($(this).attr('data-checked') === 'true') {
                    index = i;
                    if(index === 1) {
                        _this.leftBtn.hide();
                        return true;
                    }
                }
            });
            _this.liList.each(function(j) {
                if(j === index - 1) {
                    var pos = _this.liList.get(0).style.top,
                        ulHeight = _this.options.listImgHeight * j + parseInt(pos),
                        ulViewHeight = $(window).height() - 140;
                    if(ulHeight > 0) {
                        if(ulHeight - ulViewHeight > 0) {
                            var clickNum = Math.ceil((ulHeight - ulViewHeight)/_this.options.listImgHeight);
                            _this.liList.animate({
                                top: _this.options.listImgHeight * (-clickNum) + parseInt(pos)
                            });
                        }
                    }else{
                        _this.liList.animate({
                            top: parseInt(pos) - ulHeight
                        });
                    }
                    dealImg($(this), _this);
                 }
            });
        };

        this.upAndDownMove = function(type, _this) {
            var isMove = false,
                _this = _this,
                pos = _this.liList.get(0).style.top,
                downViewNum = -parseInt(pos)/_this.options.listImgHeight,
                ulHeight = _this.options.listImgHeight * _this.liList.length + parseInt(pos),
                ulViewHeight = $(window).height() - 140;
            if(type === 'up') {
                if(parseInt(pos) === 0) return;
                downViewNum --;
            }
            if(type === 'down') {
                if(ulHeight <= ulViewHeight) return;
                downViewNum ++;
            }
            if(!isMove) {
                isMove = true;
                _this.liList.animate({
                    top: -downViewNum * _this.options.listImgHeight
                }, 200, function() {
                    isMove = false;
                });
            }
        };
    };

    /**
     * 移除图片适应
     * @param _this
     */
    var removeSelfAdapting = function(_this) {
        _this.showImgNode.removeAttr('style');
    };

    /**
     * 展示区图片大小适应
      * @param _this
     */
    var selfAdapting = function(_this) {
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
        haveHtml: true
    };

    $.fn.previewImg = function (options) {
        return $(this).each(function () {
            options = $.extend({}, defaults, options);
            var previewImg = new previewImgO(this, options);
            if(!options.haveHtml && options.imgArr.length > 0) previewImg.create();
            previewImg.initShowImg();
            if(options.showBtn && options.showBtn !== "") {
                options.showBtn.click(function() {
                    previewImg.show(previewImg);
                });
                previewImg.closeBtn.click(function() {
                    previewImg.close(previewImg);
                });
            }

            //添加右边列表小图片点击事件
            previewImg.liListClick();

            //注册展示区向右点击图标点击事件
            previewImg.rightBtn.click(function() {
                previewImg.rightBtnClick(previewImg);
            });

            //注册展示区向左点击图标点击事件
            previewImg.leftBtn.click(function() {
                previewImg.leftBtnClick(previewImg);
            });

            //注册列表区向下点击图标点击事件
            previewImg.upBtn.click(function() {
                previewImg.upAndDownMove('up', previewImg);
            });

            //注册列表区向上点击图标点击事件
            previewImg.downBtn.click(function() {
                previewImg.upAndDownMove('down', previewImg)
            });
        });
    }
})(jQuery);