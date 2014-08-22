'use strict';

var utils = require('utils');

module.exports = {
  className: 'pv-illust',
  template: require('./template.html'),
  data: {
    done: false,
    fail: false
  },
  created: function created() {
    var scroll = new utils.Scroll({
      el: this.$el,
      easing: 'linear',
      duration: 200
    });

    this.$on('app:move', function(step) {
      this.$root.$emit('app:skip', step);
    });

    this.$on('img:download', function() {
      utils.download(this.src, this.filename);
    });

    this.$on('img:scroll', function(value) {
      scroll.by(value);
    });
  },
  computed: {
    src: function src() {
      var illust = this.pix.illust;

      return illust.prefix + illust.suffix + illust.cache;
    },
    filename: function filename() {
      var pix = this.pix;

      return utils.format(
        '%s - %s%s',
        pix.author.name,
        pix.desc.title,
        pix.illust.suffix
      );
    }
  },
  methods: {
    load: function load() {
      this.done = true;
      this.fail = false;
    },
    error: function error() {
      this.done = false;
      this.fail = true;
    }
  }
};
