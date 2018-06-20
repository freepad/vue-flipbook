(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .flipBook[data-v-3f41bf5c] { position: relative; perspective: 300vh; transform-style: preserve-3d; } .page[data-v-3f41bf5c] { position: absolute; top: 0; left: 0; right: auto; bottom: 0; width: 50%; transition: all .8s; cursor: pointer; overflow: hidden; backface-visibility: hidden; } .page[data-v-3f41bf5c]::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-size: 100% 100%; } .page.-first[data-v-3f41bf5c] { left: auto; margin: 0 auto; } .page.-even[data-v-3f41bf5c] { left: 0; right: auto; transform-origin: 100% 0; } .page.-even[data-v-3f41bf5c]::before { background-image: url(./img/shadow-even.png); } .page.-even[data-v-3f41bf5c]:hover { transform: rotateY(15deg); } .page.-odd[data-v-3f41bf5c] { left: auto; right: 0; transform-origin: 0 50% 0; } .page.-odd[data-v-3f41bf5c]::before { background-image: url(./img/shadow-odd.png); } .page.-odd[data-v-3f41bf5c]:hover { transform: rotateY(-15deg); } .page.-first[data-v-3f41bf5c]::before, .page.-last[data-v-3f41bf5c]::before { display: none; } .page.-hidden[data-v-3f41bf5c] { pointer-events: none; visibility: hidden; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();














var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"flipBook"},_vm._l((_vm.items),function(page,index){return _c('div',{key:index,staticClass:"page",class:page.classes,style:(page.style),on:{"click":function($event){_vm.turn(index);}}},[_vm._t("default",null,{page:page,index:index})],2)}))},staticRenderFns: [],_scopeId: 'data-v-3f41bf5c',
  data: function () { return ({
    current: 0,
    style: {}
  }); },
  props: {
    pages: {
      type: Array,
      required: true
    },
    page: {
      type: Number
    }
  },
  computed: {
    items: function items () {
      var this$1 = this;

      return this.pages.map(function (p, i) {
        var classes = [
          this$1.positionClass(i),
          this$1.isHidden(i)
        ];

        var style = {
          zIndex: this$1.zIndex(i),
          transform: this$1.transform(i)
        };

        return Object.assign({classes: classes, style: style}, p)
      })
    }
  },
  watch: {
    page: function page (newVal) {
      this.current = newVal;
    }
  },
  methods: {
    transform: function transform (i) {
      var transform = '';
      if (i % 2 && this.current < i) {
        transform = 'rotateY(180deg)';
      }
      if (i % 2 === 0 && this.current > i + 1) {
        transform = 'rotateY(-180deg)';
      }
      return transform
    },
    zIndex: function zIndex (i) {
      return this.current > i ? i - this.current + 2 : this.current - i
    },
    positionClass: function positionClass (i) {
      var positionClass = i % 2 ? '-even' : '-odd';
      if (i === 0) {
        positionClass += ' -first';
      }
      if (this.pages.length - 1 === i) {
        positionClass += ' -last';
      }
      return positionClass
    },
    isHidden: function isHidden (i) {
      if (this.current < i - 1 || this.current > i + 1 ) {
        return '-hidden'
      }
    },
    turn: function turn (i) {
      if (i === this.pages.length - 1 && i % 2 === 0) {
        return false
      }

      if (i % 2 === 0) {
        this.current = this.current + 2;
      } else if (i % 2) {
        this.current = this.current - 2;
      }

      if (this.current < 0) {
        this.current = 0;
      }
    }
  }
}

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('Flipbook', component);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default component;
export { install };
