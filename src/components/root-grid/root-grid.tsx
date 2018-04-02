import {Component, Listen, Prop, State, Watch, Element} from '@stencil/core';

@Component({
  tag: 'frl-root-grid',
  styleUrl: 'root-grid.css',
  host: {
    theme: 'root-grid',
  },
  shadow: true
})
export class RootGrid {

  @Element() rootGrid: HTMLElement;

  @Prop() align: string = 'top';
  @Prop() size: number;
  @Prop() gridSize: number = 16;

  @State() calculatedWidth: number;
  @State() calculatedHeight: number;

  @State() debug: boolean = false;

  @Watch('debug')
  render() {
    let debugTag;
    if (this.debug) {
      debugTag = <div class="debug-grid">Size: {this.calculatedWidth} / {this.calculatedHeight}</div>;
    }
    return (
      <div class={this.align + " atomic-root-grid"}>
        {debugTag}
        <slot />
      </div>
    );
  }

  @Listen('window:resize')
  recalculate(): void {
    this.calculateGridWidth();
    this.calculateGridHeight();
    this.correctBottomAlignment();
  }

  @Listen('window:keydown')
  toggleVisibleGrid($event) {
    if ($event.code === 'KeyG' && $event.altKey && $event.shiftKey) {
      $event.stopPropagation();
      this.debug = !this.debug;
    }
  }

  @Watch('calculatedWidth')
  resetWidth() {
    this.getContainer().style.width = this.calculatedWidth + 'px';
  }

  @Watch('calculatedHeight')
  resetSize() {
    this.getContainer().style.height = this.calculatedHeight + 'px';
  }

  componentDidLoad() {
    this.recalculate();
    console.log('Press Shift-Alt-g to enable debugging grid.');
  }

  calculateGridWidth(): void {
    if ((this.align === 'left' || this.align === 'right') && this.size) {
      this.calculatedWidth = this.size * this.gridSize;
    } else {
      this.calculatedWidth = Math.floor(window.innerWidth / this.gridSize) * this.gridSize;
    }
  }

  calculateGridHeight(): void {
    if ((this.align === 'top' || this.align === 'bottom') && this.size) {
      this.calculatedHeight = this.size * this.gridSize;
    } else {
      this.calculatedHeight = Math.floor(window.innerHeight / this.gridSize) * this.gridSize;
    }
  }

  correctBottomAlignment(): void {
    if (this.align === 'bottom') {
      this.getContainer().style.marginTop = window.innerHeight - this.calculatedHeight + 'px';
    }
  }

  getContainer(): HTMLElement {
    return this.rootGrid.shadowRoot.querySelector('.atomic-root-grid') as HTMLElement;
  }

}
