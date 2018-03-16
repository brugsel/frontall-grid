import {Component, Listen, Prop, State, Watch} from '@stencil/core';

@Component({
  tag: 'root-grid',
  styleUrl: 'root-grid.scss',
  host: {
    theme: 'root-grid',
  },
  shadow: true
})
export class RootGrid {

  @Prop() align: string = 'top';
  @Prop() size: number;
  @Prop() gridSize: number = 16;

  @State() calculatedWidth: number;
  @State() calculatedHeight: number;

  debug: boolean = false;

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
  componentDidLoad(): void {
    console.log('componentDidLoad');
    this.calculateGridWidth();
    this.calculateGridHeight();
  }

  @Listen('keydown')
  handleKeyDown(ev){
      console.log('down arrow pressed: ', ev);
  }
  //
  // @Listen('keydown')
  // toggleVisibleGrid($event) {
  //   debugger;
  //   if ($event.code === 'KeyG' && $event.altKey && $event.shiftKey) {
  //     console.log('Toggle debug');
  //     $event.stopPropagation();
  //     this.debug = !this.debug;
  //   }
  // }

  @Watch('calculatedWidth')
  resetWidth() {
    console.log('calculatedWidth');
    this.getContainer().style.width = this.calculatedWidth + 'px';
  }

  @Watch('calculatedHeight')
  resetSize() {
    console.log('calculatedHeight');
    this.getContainer().style.height = this.calculatedHeight + 'px';
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

  getContainer(): HTMLElement {
    return document.querySelector('root-grid').shadowRoot.querySelector('.atomic-root-grid') as HTMLElement;
  }

}
