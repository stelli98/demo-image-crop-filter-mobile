<template>
  <div id="app">
    <croppa v-model="myCroppa" canvas-color="transparent"></croppa>
    <br />
    <button @click="generateImage">Generate</button>
    <button @click="flipXImage">Flip X</button>
    <button @click="flipYImage">Flip Y</button>
    <button @click="rotateClockwiseImage">Rotate Clockwise</button>
    <button @click="rotateCounterClockwiseImage">Rotate Clockwise</button>
    <br />
    <div v-show="image" class="card-body px-2 py-2 text-center">
      <img
        ref="img"
        crossorigin="Anonymous"
        id="image"
        :src="image"
        class="img-fluid"
        :style="filters"
        data-original-width="760"
        data-original-height="476"
      />
    </div>
    <div class="col-md-5 sticky-top">
      <div class="card">
        <div class="card-header clearfix">
          <h5 class="card-title float-left m-0">Adjust the filter</h5>
          <button
            type="button"
            class="btn btn-danger btn-sm float-right"
            @click="setToDefault()"
            :disabled="!image"
          >
            <i class="fa fa-undo fa-fw"></i> Reset
          </button>
        </div>
        <div class="card-body row">
          <div class="col-md-6" :data-filter-disabled="!image">
            <div class="form-group p-0">
              <label>Grayscale ({{ filterFunctions.grayscale }})</label>
              <input
                type="range"
                class="form-control"
                step="0.1"
                min="0"
                max="1"
                v-model="filterFunctions.grayscale"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Blur ({{ filterFunctions.blur }}px)</label>
              <input
                type="range"
                class="form-control"
                step="1"
                min="0"
                max="50"
                v-model="filterFunctions.blur"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Sepia ({{ filterFunctions.sepia }})</label>
              <input
                type="range"
                class="form-control"
                step="0.1"
                min="0"
                max="1"
                v-model="filterFunctions.sepia"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Saturate ({{ filterFunctions.saturate }})</label>
              <input
                type="range"
                class="form-control"
                step="0.1"
                min="0"
                max="2"
                v-model="filterFunctions.saturate"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Opacity ({{ filterFunctions.opacity }})</label>
              <input
                type="range"
                class="form-control"
                step="0.1"
                min="0"
                max="1"
                v-model="filterFunctions.opacity"
                :disabled="!image"
              />
            </div>
          </div>
          <div class="col-md-6" :data-filter-disabled="!image">
            <div class="form-group p-0">
              <label>Brightness ({{ filterFunctions.brightness }})</label>
              <input
                type="range"
                class="form-control"
                step="0.01"
                min="0"
                max="5"
                v-model="filterFunctions.brightness"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Contrast ({{ filterFunctions.contrast }})</label>
              <input
                type="range"
                class="form-control"
                step="0.01"
                min="0"
                max="10"
                v-model="filterFunctions.contrast"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Hue-rotate ({{ filterFunctions.hueRotate }}deg)</label>
              <input
                type="range"
                class="form-control"
                step="1"
                min="-360"
                max="360"
                v-model="filterFunctions.hueRotate"
                :disabled="!image"
              />
            </div>
            <div class="form-group p-0">
              <label>Invert ({{ filterFunctions.invert }})</label>
              <input
                type="range"
                class="form-control"
                step="0.1"
                min="0"
                max="2"
                v-model="filterFunctions.invert"
                :disabled="!image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      myCroppa: null,
      image: "",
      filterFunctions: null,
      width: 0,
      height: 0
    };
  },
  methods: {
    generateImage() {
      let url = this.myCroppa.generateDataUrl();
      this.image = url;
    },
    flipXImage() {
      this.myCroppa.flipX();
    },
    flipYImage() {
      this.myCroppa.flipY();
    },
    rotateClockwiseImage() {
      this.myCroppa.rotate(1);
    },
    rotateCounterClockwiseImage() {
      this.myCroppa.rotate(-1);
    },
    makeFilter(filterSet) {
      if (!filterSet) {
        filterSet = this.filterFunctions;
      }

      var filterString = "";
      var defaultValues = this.defaultValues();
      for (var filterFunc in filterSet) {
        if (filterSet[filterFunc] !== defaultValues[filterFunc]) {
          if (filterFunc == "hueRotate") {
            filterString =
              filterString + "hue-rotate(" + filterSet[filterFunc] + "deg) ";
          } else if (filterFunc == "blur") {
            filterString =
              filterString + filterFunc + "(" + filterSet[filterFunc] + "px) ";
          } else {
            filterString =
              filterString + filterFunc + "(" + filterSet[filterFunc] + ") ";
          }
        }
      }

      return { filter: filterString };
    },
    setToDefault() {
      this.filterFunctions = this.defaultValues();
    },
    defaultValues() {
      return {
        grayscale: 0,
        sepia: 0,
        saturate: 1,
        hueRotate: 0,
        invert: 0,
        brightness: 1,
        contrast: 1,
        blur: 0,
        opacity: 1
      };
    },
    changeImage(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.loadImage(files[0]);
    },
    loadImage(file) {
      var reader = new FileReader();
      var image = new Image();

      reader.onload = e => {
        this.image = e.target.result;
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
      image.onload = function() {
        document
          .getElementById("image")
          .setAttribute("data-original-width", this.width);
        document
          .getElementById("image")
          .setAttribute("data-original-height", this.height);
      };
    },
    presets() {
      return {
        brannes: { name: "Brannes", filterSet: { sepia: 0.5, contrast: 1.4 } },
        inkwell: {
          name: "Inkwell",
          filterSet: {
            sepia: 0.3,
            contrast: 1.1,
            brightness: 1.1,
            grayscale: 1
          }
        },
        lofi: { name: "Lo-Fi", filterSet: { saturate: 1.1, contrast: 1.5 } },
        moon: {
          name: "Moon",
          filterSet: { grayscale: 1, contrast: 1.1, brightness: 1.1 }
        },
        nashville: {
          name: "Nashville",
          filterSet: {
            sepia: 0.2,
            contrast: 1.2,
            brightness: 1.05,
            saturate: 1.2
          }
        },
        toaster: {
          name: "Toaster",
          filterSet: { contrast: 1.5, brightness: 0.9 }
        },
        walden: {
          name: "Walden",
          filterSet: {
            brightness: 1.1,
            hueRotate: "-10",
            sepia: 0.3,
            saturate: 1.6
          }
        },
        willow: {
          name: "Willow",
          filterSet: { grayscale: 0.5, contrast: 0.95, brightness: 0.9 }
        },
        xpro2: { name: "X-pro II", filterSet: { sepia: 0.3 } }
      };
    },
    selectAndLoadPreset(preset) {
      if (preset) {
        this.filterFunctions = preset.filterSet;
        this.selectedPreset = preset;
      }
    },
    download() {
      const canvas = document.createElement("canvas");
      canvas.width = document
        .getElementById("image")
        .getAttribute("data-original-width");
      canvas.height = document
        .getElementById("image")
        .getAttribute("data-original-height");

      const ctx = canvas.getContext("2d");
      ctx.filter = this.filters.filter;

      var img = new Image();
      img.src = this.image;
      img.onload = function() {
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        const anchor = document.createElement("a");
        anchor.href = canvas.toDataURL();
        anchor.download = "filtered.png";
        anchor.click();
      };
    },
    defaultImage() {
      return "";
    }
  },
  created() {
    this.image = this.defaultImage();
    this.filterFunctions = this.defaultValues();
  },
  watch: {
    textCopied() {
      setTimeout(
        function() {
          if (this.textCopied == true) {
            this.textCopied = false;
          }
        }.bind(this),
        350
      );
    }
  },
  computed: {
    filters() {
      return this.makeFilter();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
