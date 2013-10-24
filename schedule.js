// Generated by CoffeeScript 1.6.3
(function() {
  (function($) {
    var mapDayName, methods;
    Number.prototype.padZero = function(len) {
      var c, s;
      if (len == null) {
        len = 2;
      }
      s = String(this);
      c = '0';
      while (s.length < len) {
        s = c + s;
      }
      return s;
    };
    methods = {
      init: function(options) {
        var settings;
        settings = $.extend({
          events: [],
          startTime: 6,
          endTime: 20,
          pixelRatio: 2,
          contentClass: '',
          lectionClass: '',
          dayClass: '',
          minuteInterval: 15
        }, options);
        return this.each(function() {
          var $this, $ul;
          $this = $(this);
          $this.data("sc-settings", settings);
          $this.addClass("scheduler").html("<div class='sc-content " + settings.contentClass + "'><ul class=sc-event-list></ul></div>");
          $ul = $this.find(".sc-event-list");
          $ul.on("click", "li", function() {
            return $(this).toggleClass("is-active");
          });
          $this.scheduler("appendEvents", settings.events);
          return $this.scheduler("setViewLayout", "day");
        });
      },
      appendEvents: function(events) {
        var $event, $this, $ul, date, day, dayDate, dayName, dayNameLower, index, label, lesson, monthName, settings, _index, _results;
        if (events == null) {
          events = [];
        }
        $this = $(this);
        $ul = $this.find(".sc-event-list");
        settings = $this.data("sc-settings");
        _results = [];
        for (index in events) {
          day = events[index];
          date = day.day;
          dayName = mapDayName(date.getDay());
          dayDate = date.getDate();
          monthName = date.getMonth();
          dayNameLower = dayName.toLowerCase();
          label = (function() {
            switch ((typeof day.label).toLowerCase()) {
              case "string":
                return day.label;
              case "function":
                return day.label();
              default:
                return "" + dayName + " - " + dayDate + "/" + monthName;
            }
          })();
          $ul.append("<li class='sc-event-label " + settings.dayClass + "'>" + label + "</li>");
          _results.push((function() {
            var _ref, _results1;
            _ref = day.list;
            _results1 = [];
            for (_index in _ref) {
              lesson = _ref[_index];
              $event = $("<li class='sc-event " + settings.lectionClass + " sc-event-" + dayNameLower + " " + (lesson.description ? "sc-has-description" : "") + "'>            <div class='sc-event-time'>              <div class='sc-event-time-start'>" + lesson.start + "</div>              <div class='sc-event-time-end'>" + lesson.end + "</div>            </div>            <div class='sc-event-content'>              <strong>" + lesson.title + "</strong>              <div class='sc-event-extra'>                <p>" + lesson.description + "</p>              </div>            </div>          </li>");
              $event.data("sc-event", lesson);
              _results1.push($ul.append($event));
            }
            return _results1;
          })());
        }
        return _results;
      },
      setViewLayout: function(view) {
        var settings;
        if (view == null) {
          view = "day";
        }
        settings = this.data("sc-settings");
        if (!this.data("sc-time-axis")) {
          this.scheduler("generateTimeAxis");
        }
        switch (view) {
          case "week":
            return this.removeClass("is-dayview").addClass("is-weekview").find(".sc-event").each(function() {
              var $this, dayStart, end, event, getMinutes, start, topPlacement;
              $this = $(this);
              event = $this.data("sc-event");
              getMinutes = function(time) {
                var hours, minutes, res, _ref;
                _ref = time.split(':'), hours = _ref[0], minutes = _ref[1];
                return res = (hours * 60) + +minutes;
              };
              start = getMinutes(event.start);
              end = getMinutes(event.end);
              dayStart = settings.startTime * 60;
              topPlacement = (start - dayStart) * settings.pixelRatio;
              return $this.css({
                top: topPlacement,
                height: (end - start) * settings.pixelRatio
              });
            });
          default:
            return this.removeClass("is-weekview").addClass("is-dayview").find(".sc-event").each(function() {
              return $(this).css({
                top: 0,
                height: "auto"
              });
            });
        }
      },
      generateTimeAxis: function() {
        var currentRow, dom, endTime, hour, minute, numberOfRows, rowHeight, settings, startTime, timespan;
        settings = this.data("sc-settings");
        this.data('sc-time-axis', true);
        console.log(settings);
        endTime = settings.endTime * 60;
        startTime = settings.startTime * 60;
        timespan = endTime - startTime;
        numberOfRows = timespan / settings.minuteInterval;
        rowHeight = settings.minuteInterval * settings.pixelRatio;
        dom = (function() {
          var _i, _results;
          _results = [];
          for (currentRow = _i = 0; _i <= numberOfRows; currentRow = _i += 1) {
            hour = Math.floor((startTime + currentRow * settings.minuteInterval) / 60).padZero();
            minute = ((startTime + currentRow * settings.minuteInterval) % 60).padZero();
            _results.push($("<li class=sc-time-axis-row>" + hour + ":" + minute + "</li>").css("height", rowHeight));
          }
          return _results;
        })();
        return $("<ul class=sc-time-axis>").append(dom).prependTo(this);
      }
    };
    mapDayName = function(day) {
      var days;
      days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return days[day - 1];
    };
    return $.fn.scheduler = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error("Method " + method + " does not exist on jQuery.scheduler");
      }
    };
  })(jQuery);

}).call(this);
