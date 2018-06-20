<template>
  <div class="flipBook">
    <div v-for="(page, index) in items"
         :key="index"
         class="page"
         :class="page.classes"
         @click="turn(index)"
         :style="page.style"
    >
        <slot :page="page" :index="index"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    current: 0,
    style: {}
  }),
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
    items () {
      return this.pages.map((p, i) => {
        const classes = [
          this.positionClass(i),
          this.isHidden(i)
        ]

        const style = {
          zIndex: this.zIndex(i),
          transform: this.transform(i)
        }

        return Object.assign({classes, style}, p)
      })
    }
  },
  watch: {
    page (newVal) {
      this.current = newVal
    }
  },
  methods: {
    transform (i) {
      let transform = ''
      if (i % 2 && this.current < i) {
        transform = 'rotateY(180deg)'
      }
      if (i % 2 === 0 && this.current > i + 1) {
        transform = 'rotateY(-180deg)'
      }
      return transform
    },
    zIndex (i) {
      return this.current > i ? i - this.current + 2 : this.current - i
    },
    positionClass (i) {
      let positionClass = i % 2 ? '-even' : '-odd'
      if (i === 0) {
        positionClass += ' -first'
      }
      if (this.pages.length - 1 === i) {
        positionClass += ' -last'
      }
      return positionClass
    },
    isHidden (i) {
      if (this.current < i - 1 || this.current > i + 1 ) {
        return '-hidden'
      }
    },
    turn (i) {
      if (i === this.pages.length - 1 && i % 2 === 0) {
        return false
      }

      if (i % 2 === 0) {
        this.current = this.current + 2
      } else if (i % 2) {
        this.current = this.current - 2
      }

      if (this.current < 0) {
        this.current = 0
      }
    }
  }
}
</script>

<style scoped>
.flipBook {
  position: relative;
  perspective: 300vh;
  transform-style: preserve-3d;
}

.page {
  position: absolute;
  top: 0;
  left: 0;
  right: auto;
  bottom: 0;
  width: 50%;
  transition: all .8s;
  cursor: pointer;
  overflow: hidden;
  backface-visibility: hidden;
}

.page::before {
  content: '';

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-size: 100% 100%;
}

.page.-first {
  left: auto;
  margin: 0 auto;
}
.page.-even {
  left: 0;
  right: auto;
  transform-origin: 100% 0;
}

.page.-even::before {
  background-image: url(./img/shadow-even.png);
}

.page.-even:hover {
  transform: rotateY(15deg);
}

.page.-odd {
  left: auto;
  right: 0;
  transform-origin: 0 50% 0;
}

.page.-odd::before {
  background-image: url(./img/shadow-odd.png);
}

.page.-odd:hover {
  transform: rotateY(-15deg);
}

.page.-first::before,
.page.-last::before {
  display: none;
}

.page.-hidden {
  pointer-events: none;
  visibility: hidden;
}
</style>
