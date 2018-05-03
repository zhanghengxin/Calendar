;
(function (undefined) {
    var _global;
    //工具函数
    //配置合并
    function extend(def, opt, override) {
        for (var k in opt) {
            if (opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
                def[k] = opt[k]
            }
        }
        return def;
    }
    //日期格式化
    function formartDate(y, m, d, symbol) {
        symbol = symbol || '-';
        m = (m.toString())[1] ? m : '0' + m;
        d = (d.toString())[1] ? d : '0' + d;
        return y + symbol + m + symbol + d
    }
    ////debugger;
    function Schedule(opt) {
        var def = {},
            opt = extend(def, opt, true),
            curDate = opt.date ? new Date(opt.date.replace(new RegExp(/-/g), "/")) : new Date(),
            year = curDate.getFullYear(),
            month = curDate.getMonth(),
            day = curDate.getDate(),
            currentYear = curDate.getFullYear(),
            currentMonth = curDate.getMonth(),
            currentDay = curDate.getDate(),
            selectedDate = '',
            externalEl = document.querySelector(opt.externalEl) || document.querySelector('body'),
            el = document.querySelector(opt.el) || document.querySelector('body'),
            _this = this;
        var selectOperation = function (e) {
            //IE8 event兼容
            var event = e || window.event;
            var target = event.target || event.srcElement;
            switch (target.id) {
                case 'nextWeek':
                    _this.nextWeekFun();
                    opt.clickCb && opt.clickCb(year, month + 1, day);
                    //selectedDate = e.target.title;
                    render()
                    break;
                case 'prevWeek':
                    _this.prevWeekFun();
                    opt.clickCb && opt.clickCb(year, month + 1, day);
                    //selectedDate = e.target.title;
                    render()
                    break;
                case 'nextWeek':
                    _this.nextWeekFun();
                    break;
                case 'nextMonth':
                    _this.nextMonthFun();
                    break;
                case 'nextYear':
                    _this.nextYearFun();
                    break;
                case 'prevWeek':
                    _this.prevWeekFun();
                    break;
                case 'prevMonth':
                    _this.prevMonthFun();
                    break;
                case 'prevYear':
                    _this.prevYearFun();
                    break;
                default:
                    break;
            };
            if (target.className.indexOf('currentDate') > -1) {
                opt.clickCb && opt.clickCb(year, month + 1, target.innerHTML);
                selectedDate = target.title;
                day = target.innerHTML;
                render();
            }
        }
        var bindEvent = function () {
            //debugger;
            if (externalEl.addEventListener || el.addEventListener) {
                externalEl && externalEl.removeEventListener('click', selectOperation, false);
                externalEl.addEventListener('click', selectOperation, false);
                //!externalEl && (el && el.removeEventListener('click', selectOperation, false), el.addEventListener('click', selectOperation, false));
            } else if (externalEl.attachEvent || el.attachEvent) {
                externalEl && externalEl.detachEvent('onclick', selectOperation);
                externalEl.attachEvent('onclick', selectOperation);
                //!externalEl && (el && el.detachEvent('onclick', selectOperation), el.attachEvent('onclick', selectOperation));
            }
        }
        var init = function () {
            //debugger;
            var scheduleHd = '<div class="schedule-hd">' +
                '<div>' +
                '<span class="arrow icon iconfont icon-116leftarrowheads" id="prevYear" ></span>' +
                '<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>' +
                '</div>' +
                '<div class="today">' + formartDate(year, month + 1, day, '-') + '</div>' +
                '<div>' +
                '<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>' +
                '<span class="arrow icon iconfont icon-115rightarrowheads" id="nextYear"></span>' +
                '</div>' +
                '</div>'
            var scheduleWeek = '<ul class="week-ul ul-box">' +
                '<li>日</li>' +
                '<li>一</li>' +
                '<li>二</li>' +
                '<li>三</li>' +
                '<li>四</li>' +
                '<li>五</li>' +
                '<li>六</li>' +
                '</ul>'
            var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';
            el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
            bindEvent();
            render();
        }
        var render = function () {
            var fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
                startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
                total = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7), //元素总个数
                lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
                eleTemp = [];
            for (var i = 0; i < total; i++) {
                if (i < startWeek) {
                    eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
                } else if (i < (startWeek + fullDay)) {
                    var nowDate = formartDate(year, month + 1, (i + 1 - startWeek), '-');
                    var addClass = '';
                    selectedDate == nowDate && (addClass = 'selected-style');
                    formartDate(currentYear, currentMonth + 1, currentDay, '-') == nowDate && (addClass = 'today-flag');
                    eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
                } else {
                    eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
                }
            }
            el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
            el.querySelector('.today').innerHTML = formartDate(year, month + 1, day, '-');
            //7天时间计算
            var today = formartDate(year, month + 1, day, '/');
            ////debugger;
            var date1 = formartDate(year, month + 1, day, '-');
            var date2 = new Date(today);
            date2.setDate(date2.getDate() + 6);
            date2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
            $(".hzqx-main-time-select").html(date1 + "至" + date2);

        };
        this.nextWeekFun = function () {
            
            //var today = new Date(year, month, day);
            //var nextWeek = today.setDate(today.getDate() + 7);
            var today = new Date(year, month, day) - 0;
            var nextWeek = new Date(today - 0 + 7 * 24 * 60 * 60 * 1000);
            year = nextWeek.getFullYear();
            month = nextWeek.getMonth();
            day = nextWeek.getDate();
            render();
            opt.nextWeekCb && opt.nextWeekCb(year, month + 1, day);
        },
            this.nextMonthFun = function () {
            if (month + 1 > 11) {
                year += 1;
                month = 0;
            } else {
                month += 1;
            }
            render();
            opt.nextMonthCb && opt.nextMonthCb(year, month + 1, day);
        },
            this.nextYearFun = function () {
            year += 1;
            render();
            opt.nextYeayCb && opt.nextYeayCb(year, month + 1, day);
        },
            this.prevWeekFun = function () {
            //var today = new Date(year, month, day);
            //var prevWeek = today.setDate(today.getDate() - 7);
            var today = new Date(year, month, day);
            var prevWeek = new Date(today - 7 * 24 * 60 * 60 * 1000)
            year = prevWeek.getFullYear();
            month = prevWeek.getMonth();
            day = prevWeek.getDate();
            render();
            opt.prevWeekCb && opt.prevWeekCb(year, month + 1, day);
        },
            this.prevMonthFun = function () {
            if (month - 1 < 0) {
                year -= 1;
                month = 11;
            } else {
                month -= 1;
            }
            render();
            opt.prevMonthCb && opt.prevMonthCb(year, month + 1, day);
        },
            this.prevYearFun = function () {
            year -= 1;
            render();
            opt.prevYearCb && opt.prevYearCb(year, month + 1, day);
        },
            this.init2 = function (DATE) {
            // body...
            var DATE_STR = DATE.replace(new RegExp(/-/g), "/")
            year = DATE && new Date(DATE_STR).getFullYear() //|| year;
            month = DATE && new Date(DATE_STR).getMonth() //|| month;
            day = DATE && new Date(DATE_STR).getDate() //|| day;
            render();
        }
        init();
    }
    //将插件暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this')
    }());
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Schedule;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return Schedule;
        })
    } else {
        !('Schedule' in _global) && (_global.Schedule = Schedule);
    }

}());